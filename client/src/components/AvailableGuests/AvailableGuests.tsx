import { FC } from "react";
import { SearchedHotelFetchedType } from "../../context/types/search";
import { makeStyleGuests } from "./styleGuests";
import { FaPerson } from "react-icons/fa6";
import { FaChild } from "react-icons/fa6";

type PropsType = {
  hotel: SearchedHotelFetchedType;
};

const AvailableGuests: FC<PropsType> = ({ hotel }) => {
  const { colors, numIcons } = makeStyleGuests({ hotel });

  return (
    <div className="w-full rounded-2xl font-semibold grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
      <div className={`border-2 rounded-xl px-5 py-2 ${colors[0]}`}>
        <div className="font-semibold grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-5">
          {hotel.availableAdults
            ? `Adults: available ${hotel.availableAdults} / ${hotel.adultCount}`
            : "Full"}
          <div className="flex items-center gap-2">
            {Array.from({ length: numIcons[0] }).map((_, i) => (
              <FaPerson key={i} size={20} />
            ))}
          </div>
        </div>
      </div>
      <div className={`border-2 rounded-xl px-5 py-2 ${colors[1]}`}>
        <div className="font-semibold grid grid-cols-1 lg:grid-cols-2 lg:gap-5 gap-2">
          {hotel.availableChildren
            ? `   Children: available ${hotel.availableChildren} / ${hotel.childCount}`
            : "Full"}
          <div className="flex items-center gap-2">
            {Array.from({ length: numIcons[1] }).map((_, i) => (
              <FaChild key={i} size={20} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AvailableGuests;
