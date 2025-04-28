import { TiWorld } from "react-icons/ti";
import { genId } from "../../utils/genId";
import { LuHotel } from "react-icons/lu";
import { FaCity } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";

export const fieldsArrLeft = [
  {
    id: genId(),
    field: "name",
    label: "Hotel",
    icon: LuHotel,
  },
  {
    id: genId(),
    field: "country",
    label: "Country",
    icon: TiWorld,
  },
  {
    id: genId(),
    field: "city",
    label: "City",
    icon: FaCity,
  },
  {
    id: genId(),
    field: "pricePerNight",
    label: "Price Per Night",
    icon: GiReceiveMoney,
  },
];
