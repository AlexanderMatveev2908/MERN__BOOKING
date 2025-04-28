import { FC, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { fieldsPriceNumberArr } from "./fieldsPrice";

type PropsType = {
  minPriceState: string;
  maxPriceState: string;
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PriceFilter: FC<PropsType> = ({
  minPriceState,
  maxPriceState,
  handleChangeSearch,
}) => {
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 md:gap-2 ">
      <div
        onClick={() => setDropOpen(!dropOpen)}
        className={`font-semibold flex justify-between items-center px-5 py-2 md:p-0 border-2 md:border-0 border-green-600 cursor-pointer border-t-0 ${
          dropOpen ? "" : "rounded-b-2xl"
        }`}
      >
        <span className="text-lg">Price Per Night:</span>
        <FaChevronDown
          size={25}
          className={`hover:text-green-600 transition-all duration-300 cursor-pointer ${
            dropOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      <div
        className={`grid grid-cols-1 md:p-0 w-full border-2 border-green-600 border-t-0 rounded-b-2xl md:border-0 transition-all duration-300  ${
          dropOpen ? "max-h-[250px] p-3" : "max-h-0 p-0 border-transparent"
        }`}
      >
        <div
          className={`grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 md:gap-2 md:mt-2 transition-all duration-300 ${
            dropOpen
              ? "opacity-100 cursor-pointer"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {fieldsPriceNumberArr.map((field) => (
            <label key={field.id} className="flex flex-col gap-3">
              <span className="font-semibold ml-1">{field.label}</span>
              <input
                type="number"
                name={field.name}
                onChange={handleChangeSearch}
                value={
                  field.name === "minPricePerNight"
                    ? minPriceState
                    : maxPriceState
                }
                className="bg-[#222] text-[whitesmoke] px-5 py-1
 rounded-full border-2 border-green-600 focus_input outline-none"
                placeholder={field.place}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PriceFilter;
