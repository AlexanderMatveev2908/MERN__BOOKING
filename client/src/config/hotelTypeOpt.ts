import {
  FaBusinessTime,
  FaHeart,
  FaMoneyBill,
  FaMountain,
  FaParking,
  FaSkiing,
  FaSpa,
  FaUmbrellaBeach,
  FaWifi,
} from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { IoIosFitness } from "react-icons/io";
import { IoGolf } from "react-icons/io5";
import {
  MdCabin,
  MdFamilyRestroom,
  MdHotel,
  MdHotelClass,
  MdLocalAirport,
  MdOutlinePets,
  MdOutlinePool,
} from "react-icons/md";
import { PiForkKnifeBold } from "react-icons/pi";
import { RiVipDiamondLine } from "react-icons/ri";
import { TbSmokingNo } from "react-icons/tb";

export const hotelTypesOpt = [
  "Budget",
  "Boutique",
  "Luxury",
  "Ski Resort",
  "Business",
  "Family",
  "Romantic",
  "Hiking Resort",
  "Cabin",
  "Beach Resort",
  "Golf Resort",
  "Motel",
  "All Inclusive",
  "Pet Friendly",
  "Self Catering",
];

export const hotelTypesWithIcons = {
  Budget: FaMoneyBill,
  Boutique: MdHotelClass,
  Luxury: RiVipDiamondLine,
  "Ski Resort": FaSkiing,
  Business: FaBusinessTime,
  Family: MdFamilyRestroom,
  Romantic: FaHeart,
  "Hiking Resort": FaMountain,
  Cabin: MdCabin,
  "Beach Resort": FaUmbrellaBeach,
  "Golf Resort": IoGolf,
  Motel: MdHotel,
  "All Inclusive": GrStatusGood,
  "Pet Friendly": MdOutlinePets,
  "Self Catering": PiForkKnifeBold,
};

export const hotelFacilitiesOpt = [
  "Free WiFi",
  "Parking",
  "Airport Shuttle",
  "Family Rooms",
  "Non-Smoking Rooms",
  "Outdoor Pool",
  "Spa",
  "Fitness Center",
];

export const hotelFacilitiesWithIcons = {
  "Free WiFi": FaWifi,
  Parking: FaParking,
  "Airport Shuttle": MdLocalAirport,
  "Family Rooms": MdFamilyRestroom,
  "Non-Smoking Rooms": TbSmokingNo,
  "Outdoor Pool": MdOutlinePool,
  Spa: FaSpa,
  "Fitness Center": IoIosFitness,
};
