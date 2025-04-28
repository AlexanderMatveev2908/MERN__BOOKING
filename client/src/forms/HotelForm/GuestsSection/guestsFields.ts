import { genId } from "../../../utils/genId";

enum GuestFieldTypes {
  ADULTS = "adultCount",
  CHILDREN = "childCount",
}

export type GuestFieldType = {
  id: string;
  field: GuestFieldTypes;
  label: string;
};

export const guestsFieldsArr = [
  { id: genId(), field: GuestFieldTypes.ADULTS, label: "Adults" },
  { id: genId(), field: GuestFieldTypes.CHILDREN, label: "Children" },
];
