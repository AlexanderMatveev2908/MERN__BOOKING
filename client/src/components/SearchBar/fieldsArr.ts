import { genId } from "../../utils/genId";

export const searchFieldAGuestsArr = [
  {
    id: genId(),
    name: "adultCount",
    min: 1,
    label: "Adults",
  },
  {
    id: genId(),
    name: "childCount",
    min: 0,
    label: "Child",
  },
];

export const searchFieldADatesArr = [
  {
    id: genId(),
    name: "checkIn",
    min: 1,
    label: "Check-in",
  },
  {
    id: genId(),
    name: "checkOut",
    min: 0,
    label: "Check-out",
  },
];

export const minDate = new Date();
export const maxDate = new Date(
  new Date().setFullYear(new Date().getFullYear() + 1)
);
