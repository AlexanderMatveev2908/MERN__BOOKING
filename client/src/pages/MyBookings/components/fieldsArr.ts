import { LuHotel } from "react-icons/lu";
import { genId } from "../../../utils/genId";
import { TiWorld } from "react-icons/ti";
import { FaChild, FaCity, FaHandHoldingUsd } from "react-icons/fa";
import {
  FaBuildingCircleArrowRight,
  FaBuildingCircleCheck,
  FaBuildingUser,
  FaPerson,
} from "react-icons/fa6";
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
];

export const fieldsArrRight = [
  {
    id: genId(),
    field: "checkIn",
    label: "Check-In",
    icon: FaBuildingCircleCheck,
  },
  {
    id: genId(),
    field: "checkOut",
    label: "Check-Out",
    icon: FaBuildingCircleArrowRight,
  },
  {
    id: genId(),
    field: "adultCount",
    label: "Adult Count",
    icon: FaPerson,
  },
  {
    id: genId(),
    field: "childCount",
    label: "Child Count",
    icon: FaChild,
  },
  {
    id: genId(),
    field: "totalNights",
    label: "Total Nights",
    icon: FaBuildingUser,
  },
  {
    id: genId(),
    field: "pricePerNight",
    label: "Price Per Night",
    icon: GiReceiveMoney,
  },
  {
    id: genId(),
    field: "totalPrice",
    label: "Total Price",
    icon: FaHandHoldingUsd,
  },
];
