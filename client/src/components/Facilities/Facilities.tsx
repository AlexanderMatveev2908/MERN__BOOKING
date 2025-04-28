import { FC, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

type PropsType = {
  facilities: string[];
};

const Facilities: FC<PropsType> = ({ facilities }) => {
  const [openFacilities, setOpenFacilities] = useState(false);
  const [siblingActive, setSiblingActive] = useState(false);
  return (
    <div className="my_hotels__item relative">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => {
          setSiblingActive(!siblingActive);
          setOpenFacilities(!openFacilities);
        }}
        onMouseOver={() => {
          setSiblingActive(true);
          setOpenFacilities(true);
        }}
        onMouseLeave={() => {
          setSiblingActive(false);
          setOpenFacilities(false);
        }}
      >
        <FaChevronDown
          className={`${
            openFacilities ? "rotate-180" : "rotate-0"
          } transition-all duration-300`}
        />
        <span className="cursor-pointer">Facilities</span>
      </div>
      <ul
        onMouseOver={(e) => {
          const prevSibling = e.currentTarget.previousElementSibling;
          if (siblingActive)
            if (prevSibling)
              prevSibling.dispatchEvent(
                new MouseEvent("mouseover", { bubbles: true })
              );
        }}
        onMouseLeave={(e) => {
          const prevSibling = e.currentTarget.previousElementSibling;
          if (siblingActive)
            if (prevSibling)
              prevSibling.dispatchEvent(
                new MouseEvent("mouseout", { bubbles: true })
              );
        }}
        className={`absolute transition-all duration-300 top-0 group left-[max(10%,75px)] z-20 ${
          openFacilities
            ? "translate-y-[-75%]"
            : "translate-y-0 pointer-events-none"
        }`}
      >
        {facilities.map((facility) => (
          <li
            className={`border-2 border-b-0 border-green-600 text-[whitesmoke] first:border-b-0 first:rounded-t-xl last:border-b-2 last:rounded-b-xl font-semibold p-2 hover:bg-green-600 hover:text-neutral-950 min-w-[150px] pseudo_btn bg-[#222] 
        ${
          openFacilities
            ? "opacity-100 cursor-default"
            : " opacity-0  pointer-events-none"
        } text-sm`}
            key={facility}
          >
            {facility}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Facilities;
