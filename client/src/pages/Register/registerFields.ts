import { REG_EMAIL, REG_NAME, REG_PWD } from "../../constants/regex";
import { genId } from "../../utils/genId";

export type RegisterFieldType = {
  id: string;
  field: "firstName" | "lastName" | "email" | "password" | "confirmPassword";
  label: string;
  type: string;
  msg: string;
  placeholder: string;
  pattern: RegExp;
};

const makeMsgName = (field: string): string =>
  `${field} should be between 3 to 50 characters. Can only contain letters, spaces, periods, hyphens, and apostrophes`;

export const registerFieldsArr: RegisterFieldType[] = [
  {
    id: genId(),
    field: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Your First Name...",
    msg: makeMsgName("First Name"),
    pattern: REG_NAME,
  },
  {
    id: genId(),
    field: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Your Last Name...",
    msg: makeMsgName("Last Name"),
    pattern: REG_NAME,
  },
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
  {
    id: genId(),
    field: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm Your Password...",
    msg: "Password must be at least 8 long. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    pattern: REG_PWD,
  },
];

export const multiRowFields = ["firstName", "lastName"];

export const registerFieldsObj = registerFieldsArr.reduce((acc, curr) => {
  acc[curr.field] = curr;
  return acc;
}, {} as Record<string, RegisterFieldType>);
