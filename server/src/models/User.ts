import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  verificationToken: string | null;
  expiryVerificationToken: Date | null;
  changePwdToken: string | null;
  expiryChangePwdToken: Date | null;
};

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: null,
  },
  expiryVerificationToken: {
    type: Date,
    default: null,
  },
  changePwdToken: {
    type: String,
    default: null,
  },
  expiryChangePwdToken: {
    type: Date,
    default: null,
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User =
  mongoose.models.User || mongoose.model<UserType>("User", UserSchema);

export default User;
