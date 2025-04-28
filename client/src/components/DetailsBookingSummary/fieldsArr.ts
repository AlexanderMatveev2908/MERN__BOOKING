import { genId } from "../../utils/genId";

export const fieldsArrSearch = [
  {
    id: genId(),
    label: "Check-in",
    field: "checkIn",
  },
  {
    id: genId(),
    label: "Check-out",
    field: "checkOut",
  },
  {
    id: genId(),
    label: "Adult Count",
    field: "adultCount",
  },
  {
    id: genId(),
    label: "Child Count",
    field: "childCount",
  },
];

export const fieldsArrHotel = [
  {
    id: genId(),
    label: "Name",
    field: "name",
  },
  {
    id: genId(),
    label: "Country",
    field: "country",
  },
  {
    id: genId(),
    label: "City",
    field: "city",
  },
];

export const priceField = {
  id: genId(),
  label: "Price Per Night",
  field: "pricePerNight",
};
export const totNightsField = {
  id: genId(),
  label: "Total Nights",
  field: "noNights",
};
