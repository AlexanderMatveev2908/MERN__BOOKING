import { genId } from "../../utils/genId";

export const fieldsArr = [
  { id: genId(), field: "firstName", type: "text", label: "First Name" },
  { id: genId(), field: "lastName", type: "text", label: "Last Name" },
  { id: genId(), field: "email", type: "email", label: "Email" },
];
