import { REG_EMAIL, REG_PWD } from "../../constants/regex";
import { genId } from "../../utils/genId";
import { RegisterFieldType } from "../Register/registerFields";

export type LoginFieldType = Omit<RegisterFieldType, "field"> & {
  field: "email" | "password";
};

export const loginFieldsArr: LoginFieldType[] = [
  {
    id: genId(),
    field: "email",
    label: "Email",
    type: "email",
    placeholder: "Your Email...",
    msg: "Insert a valid email address",
    pattern: REG_EMAIL,
  },
  {
    id: genId(),
    field: "password",
    label: "Password",
    type: "password",
    placeholder: "Your Password...",
    msg: "Password must be at least 8 long. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    pattern: REG_PWD,
  },
];
