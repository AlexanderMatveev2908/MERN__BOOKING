import { FC, useEffect, useState } from "react";
import { makeStyleGuests } from "./styleGuests";
import { FaPerson } from "react-icons/fa6";
import { FaChild } from "react-icons/fa";
import { PulseLoader } from "react-spinners";

type PropsType = {
  adultCount: number;
  childCount: number;
  availableAdults: number;
  availableChildren: number;
  isLoadingGuests: boolean;
};
const AvailableGuestsHotel: FC<PropsType> = ({
  adultCount,
  childCount,
  availableAdults,
  availableChildren,
  isLoadingGuests,
}) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isLoadingGuests) {
      setShowLoader(true);
    } else {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isLoadingGuests]);

  const { colors, numIcons } = makeStyleGuests({
    adultCount,
    childCount,
    availableAdults,
    availableChildren,
  });

  return showLoader ? (
    <div className="flex flex-col items-center gap-y-5 md:flex-row md:justify-around">
      <PulseLoader size={30} color="whitesmoke" />
      <PulseLoader size={30} color="whitesmoke" />
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] md:gap-5 gap-2 gap-y-5">
      <div
        className={`border-2 rounded-xl p-3 flex flex-col sm:grid grid-cols-[220px_1fr] gap-2 ${colors[0]}`}
      >
        <span className="font-semibold sm:text-lg">
          {availableAdults
            ? `Adults: available ${availableAdults} / ${adultCount}`
            : "Full"}
        </span>

        <div className="flex items-center gap-2">
          {Array.from({ length: numIcons[0] }).map((_, i) => (
            <FaPerson key={i} size={20} className="h-[25px] w-[25px]" />
          ))}
        </div>
      </div>

      <div
        className={`border-2 rounded-xl p-3 flex flex-col sm:grid grid-cols-[220px_1fr] gap-2 ${colors[1]}`}
      >
        <span className="font-semibold sm:text-lg">
          {availableChildren
            ? `   Children: available ${availableChildren} / ${childCount}`
            : "Full"}
        </span>

        <div className="flex items-center gap-2">
          {Array.from({ length: numIcons[1] }).map((_, i) => (
            <FaChild key={i} size={20} className="h-[25px] w-[25px]" />
          ))}
        </div>
      </div>
    </div>
  );
};
export default AvailableGuestsHotel;
