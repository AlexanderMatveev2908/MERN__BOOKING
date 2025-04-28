import { FC, useState } from "react";
import { HotelFetchedType } from "../../../context/types/hotels";
import { FaChevronDown } from "react-icons/fa";
import { hotelFacilitiesWithIcons } from "../../../config/hotelTypeOpt";

type PropsType = {
  hotel: HotelFetchedType;
};

const FacilitiesHotel: FC<PropsType> = ({ hotel }) => {
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <div className="relative w-[80%] md:w-full sm:w-[90%] md:justify-self-start px-5 sm:px-0 py-2 border-2 rounded-xl border-green-600  cursor-pointer sm:py-4 sm:border-0">
      <div
        onClick={() => setDropOpen(!dropOpen)}
        className="flex justify-between group"
      >
        <span className="text-lg sm:text-xl font-semibold group-hover:text-green-600 transition-all duration-300">
          Facilities
        </span>

        <FaChevronDown
          className={`h-[30px] w-[30px] transition-all group-hover:text-green-600 duration-300 sm:hidden ${
            dropOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <ul
        className={`absolute bg-[#222] border-2 border-green-600 rounded-xl flex flex-col items-start top-0 w-full left-0 py-1 sm:static sm:opacity-100 sm:translate-y-0 sm:border-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-5 sm:mt-3 sm:pointer-events-auto ${
          dropOpen
            ? "translate-y-[60px] cursor-pointer opacity-100 transition-all duration-300 "
            : "pointer-events-none opacity-0 translate-y-[-300px]"
        }`}
      >
        {hotel.facilities.map((fac: string, i: number) => {
          const Icon =
            hotelFacilitiesWithIcons[
              fac as keyof typeof hotelFacilitiesWithIcons
            ];
          return (
            <li
              key={i}
              className="flex w-full gap-3 items-center border-b-2 last:border-b-0 px-3 py-2 border-green-600 transition-all duration-300 hover:text-green-600 sm:border-2 sm:last:border-2 sm:rounded-xl"
            >
              {!!Icon && <Icon />}
              <span>{fac}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default FacilitiesHotel;
