import { FaSortAmountUp, FaSortAmountUpAlt } from "react-icons/fa";
import { genId } from "../../../utils/genId";

export const fieldSortersArrWithIcons = [
  {
    id: genId(),
    icon: FaSortAmountUp,
    label: "From Lowest Price",
    value: "asc",
    field: "sorterPrice",
  },
  {
    id: genId(),
    icon: FaSortAmountUpAlt,
    label: "From Highest Price",
    value: "desc",
    field: "sorterPrice",
  },
  {
    id: genId(),
    icon: FaSortAmountUp,
    label: "From Lowest Rating",
    value: "asc",
    field: "sorterStars",
  },
  {
    id: genId(),
    icon: FaSortAmountUpAlt,
    label: "From Highest Rating",
    value: "desc",
    field: "sorterStars",
  },
];
