import { REG_EMAIL } from "../../constants/regex";
import { genId } from "../../utils/genId";

export const fieldEmail = {
  field: "email",
  reg: REG_EMAIL,
  id: genId(),
  msg: "Insert a valid email address",
  type: "email",
  placeholder: "Your email...",
};
