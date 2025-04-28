import { FaChild, FaHandHoldingUsd, FaRegUserCircle } from "react-icons/fa";
import {
  FaBuildingCircleArrowRight,
  FaBuildingCircleCheck,
  FaBuildingUser,
  FaPerson,
} from "react-icons/fa6";
import { genId } from "../../../utils/genId";
import { LuHotel } from "react-icons/lu";
import { MdDriveFileRenameOutline } from "react-icons/md";

export const fieldsArrRightBookCalcMoney = [
  {
    id: genId(),
    field: "totalNights",
    label: "Total Nights",
    icon: FaBuildingUser,
  },
  {
    id: genId(),
    field: "totalPrice",
    label: "Total Price",
    icon: FaHandHoldingUsd,
  },
];

export const nameHotel = {
  id: genId(),
  field: "name",
  label: "Hotel",
  icon: LuHotel,
};

export const fieldsArrLeftUser = [
  { id: genId(), field: "email", label: "Email", icon: FaRegUserCircle },
  {
    id: genId(),
    field: "firstName",
    label: "First Name",
    icon: MdDriveFileRenameOutline,
  },
  {
    id: genId(),
    field: "lastName",
    label: "Last Name",
    icon: MdDriveFileRenameOutline,
  },
];

export const fieldsArrLeftBookDetails = [
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
];
