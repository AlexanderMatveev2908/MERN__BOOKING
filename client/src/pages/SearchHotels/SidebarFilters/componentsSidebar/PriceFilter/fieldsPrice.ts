import { genId } from "../../../../../utils/genId";

export const fieldsPriceNumberArr = [
  {
    id: genId(),
    name: "minPricePerNight",
    place: "At least...",
    label: "Min Price",
  },
  {
    id: genId(),
    name: "maxPricePerNight",
    place: "At most...",
    label: "Max Price",
  },
];
