import { FC, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  hotelTypesOpt,
  hotelTypesWithIcons,
} from "../../../../config/hotelTypeOpt";

type PropsType = {
  types: string[];
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter: FC<PropsType> = ({ types, handleChangeSearch }) => {
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 md:gap-2 ">
      <div
        onClick={() => setDropOpen(!dropOpen)}
        className="font-semibold flex justify-between items-center px-5 py-2 md:p-0 border-2 md:border-0 border-green-600 cursor-pointer border-t-0"
      >
        <span className="text-lg">Hotel Types:</span>
        <FaChevronDown
          size={25}
          className={`hover:text-green-600 transition-all duration-300 cursor-pointer ${
            dropOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      <div
        className={`grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-1 md:gap-2 md:p-0 w-full border-2 border-green-600 border-t-0 md:border-0 transition-all duration-300 ${
          dropOpen ? "max-h-[500px] p-3" : "max-h-0 p-0 border-transparent"
        }`}
      >
        {hotelTypesOpt.map((type) => {
          const Icon =
            hotelTypesWithIcons[type as keyof typeof hotelTypesWithIcons];
          return (
            <label
              key={type}
              className={`flex items-center px-3 py-1 md:p-0 transition-all duration-300 ${
                dropOpen
                  ? "cursor-pointer opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <input
                onChange={handleChangeSearch}
                type="checkbox"
                value={type}
                name="types"
                checked={types.includes(type)}
                className="cursor-pointer"
              />

              <Icon
                size={20}
                className={`${
                  types.includes(type) ? "text-green-600" : "text-[whitesmoke]"
                } ml-5`}
              />

              <span
                className={`${
                  types.includes(type) ? "text-green-600" : "text-[whitesmoke]"
                } ml-3`}
              >
                {type}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
export default HotelTypesFilter;
