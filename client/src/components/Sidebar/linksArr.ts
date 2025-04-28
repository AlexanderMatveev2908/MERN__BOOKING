import { AiFillHome } from "react-icons/ai";
import { genId } from "../../utils/genId";
import { FaAddressBook, FaHotel, FaSearch } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export const sideLinks = [
  {
    id: genId(),
    label: "Home",
    path: "/",
    icon: AiFillHome,
    hasToBeLogin: false,
  },
  {
    id: genId(),
    label: "Search",
    path: "/search",
    icon: FaSearch,
    hasToBeLogin: false,
  },
  {
    id: genId(),
    label: "My Hotels",
    path: "/admin/my-hotels",
    icon: FaHotel,
    hasToBeLogin: true,
  },
  {
    id: genId(),
    label: "Manage Bookings",
    path: "/admin/manage-bookings",
    icon: MdOutlineAdminPanelSettings,
    hasToBeLogin: true,
  },
  {
    id: genId(),
    label: "My Bookings",
    path: "/guest/my-bookings",
    icon: FaAddressBook,
    hasToBeLogin: true,
  },
];
