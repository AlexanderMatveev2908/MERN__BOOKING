import { FC, useState } from "react";
import { FaChevronDown, FaStar } from "react-icons/fa";

type PropsType = {
  starRating: string[];
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter: FC<PropsType> = ({
  starRating,
  handleChangeSearch,
}) => {
  const [dropOpen, setDropOpe] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 md:gap-2 md:-mt-5">
      <div
        onClick={() => setDropOpe(!dropOpen)}
        className="font-semibold flex justify-between items-center px-5 py-2 md:p-0 border-2 md:border-0 border-green-600 rounded-t-xl cursor-pointer"
      >
        <span className="text-lg">Star Rating:</span>
        <FaChevronDown
          size={25}
          className={` hover:text-green-600 transition-all duration-300 cursor-pointer ${
            dropOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      <div
        className={`flex flex-col md:gap-2 md:p-0 border-2 border-green-600 border-t-0 md:border-0 w-full transition-all duration-300 ${
          dropOpen ? "max-h-[500px] p-3" : "max-h-0 p-0 border-transparent"
        }`}
      >
        {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
          <label
            key={num}
            className={`flex gap-5 px-5 py-2 md:p-0 cursor-pointer transition-all duration-300 ${
              dropOpen
                ? "opacity-100 cursor-pointer"
                : "pointer-events-none opacity-0"
            }`}
          >
            <input
              onChange={handleChangeSearch}
              type="checkbox"
              value={num}
              name="starRating"
              checked={starRating.includes(num + "")}
              className="cursor-pointer"
            />
            <div className="flex gap-2">
              {Array.from({ length: num }).map((_, i) => (
                <span key={i}>
                  {
                    <FaStar
                      size={15}
                      className={`${
                        starRating.includes(num + "") ? "text-green-600" : ""
                      }`}
                    />
                  }
                </span>
              ))}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
export default StarRatingFilter;
