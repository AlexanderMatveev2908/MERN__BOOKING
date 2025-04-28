import { genId } from "../../../utils/genId";

export enum HotelField {
  NAME = "name",
  CITY = "city",
  COUNTRY = "country",
  DESCRIPTION = "description",
  PRICE = "pricePerNight",
  STAR = "starRating",
}

export type FieldHotelType = {
  id: string;
  field: HotelField;
  type: string;
  label: string;
};

export const fieldsHotelArr = [
  {
    id: genId(),
    field: HotelField.NAME,
    type: "text",
    label: "Name",
  },
  {
    id: genId(),
    field: HotelField.CITY,
    type: "text",
    label: "City",
  },
  {
    id: genId(),
    field: HotelField.COUNTRY,
    type: "text",
    label: "Country",
  },
  {
    id: genId(),
    field: HotelField.DESCRIPTION,
    type: "",
    label: "Description",
  },
  {
    id: genId(),
    field: HotelField.PRICE,
    type: "text",
    label: "Price",
  },
  {
    id: genId(),
    field: HotelField.STAR,
    type: "",
    label: "Star Rating",
  },
];

export const makeLabel = (field: string) =>
  `${field.charAt(0).toUpperCase()}${field.slice(1)}`;

export const fieldsToPut2InRow = ["city", "country"];

export const fieldsHotelObj = fieldsHotelArr.reduce((acc, curr) => {
  acc[curr.field] = curr;
  return acc;
}, {} as Record<string, FieldHotelType>);
