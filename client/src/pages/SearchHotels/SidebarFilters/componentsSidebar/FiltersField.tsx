import { FC, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

type PropsType = {
  filtersState: string[];
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filtersConfig: string[];
  title: string;
};

const FiltersField: FC<PropsType> = ({
  filtersState,
  handleChangeSearch,
  filtersConfig,
  title,
}) => {
  const [dropOpen, setDropOpe] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 md:gap-2 ">
      <div
        onClick={() => setDropOpe(!dropOpen)}
        className="font-semibold flex justify-between items-center px-5 py-2 md:p-0 border-2 md:border-0 border-green-600 cursor-pointer border-t-0"
      >
        <span className="text-lg">{title}:</span>
        <FaChevronDown
          size={25}
          className={`hover:text-green-600 transition-all duration-300 cursor-pointer ${
            dropOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      <div
        className={`grid-cols-2 md:grid-cols-1 md:gap-2 md:p-0 w-full border-2 border-green-600 border-t-0 rounded-b-2xl md:border-0 p-3 ${
          dropOpen ? "grid" : "hidden"
        }`}
      >
        {filtersConfig.map((filtConf: string) => (
          <label
            key={filtConf}
            className="flex gap-5 items-center px-3 py-1 md:p-0 cursor-pointer"
          >
            <input
              onChange={handleChangeSearch}
              type="checkbox"
              value={filtConf}
              name={title.split(" ")[1].toLowerCase()}
              checked={filtersState.includes(filtConf)}
              className="cursor-pointer"
            />

            <span
              className={`${
                filtersState.includes(filtConf)
                  ? "text-green-600"
                  : "text-[whitesmoke]"
              }`}
            >
              {filtConf}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
export default FiltersField;
