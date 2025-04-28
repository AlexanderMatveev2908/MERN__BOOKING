import { REG_PWD } from "../../constants/regex";
import { genId } from "../../utils/genId";

export const fieldsChangePwd = [
  {
    id: genId(),
    field: "password",
    msg: "Password must be at least 8 long. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    reg: REG_PWD,
    type: "password",
    placeholder: "Your password...",
  },
  {
    id: genId(),
    field: "confirmPassword",
    msg: "You need to confirm new password",
    reg: REG_PWD,
    type: "password",
    placeholder: "Confirm your password",
  },
];
