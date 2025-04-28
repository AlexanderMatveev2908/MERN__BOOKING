import { FC } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
} from "react-icons/fa";

type PropsType = {
  direction: string;
  setDirection: (dir: string) => void;
};

const KeysGame: FC<PropsType> = ({ direction, setDirection }) => {
  return (
    <div className="p-2 md:p-5 border-2 border-green-600 rounded-2xl bg-neutral-950 grid grid-cols-[repeat(2,100px)] gap-2 md:gap-5">
      <span
        onClick={() => direction !== "DOWN" && setDirection("UP")}
        className="col-span-2 not_found__command_key"
      >
        <FaChevronUp
          size={25}
          className={`cursor-pointer ${
            direction === "UP" ? "text-green-600" : "text-[whitesmoke]"
          }`}
        />
      </span>

      <span
        onClick={() => direction !== "RIGHT" && setDirection("LEFT")}
        className="not_found__command_key"
      >
        <FaChevronLeft
          size={25}
          className={`cursor-pointer ${
            direction === "LEFT" ? "text-green-600 " : "text-[whitesmoke]"
          }`}
        />
      </span>

      <span
        onClick={() => direction !== "LEFT" && setDirection("RIGHT")}
        className=" not_found__command_key"
      >
        <FaChevronRight
          size={25}
          className={`cursor-pointer ${
            direction === "RIGHT" ? "text-green-600" : "text-[whitesmoke]"
          }`}
        />
      </span>

      <span
        onClick={() => direction !== "UP" && setDirection("DOWN")}
        className="not_found__command_key col-span-2"
      >
        <FaChevronDown
          size={25}
          className={`cursor-pointer ${
            direction === "DOWN" ? "text-green-600" : "text-[whitesmoke]"
          }`}
        />
      </span>
    </div>
  );
};
export default KeysGame;
