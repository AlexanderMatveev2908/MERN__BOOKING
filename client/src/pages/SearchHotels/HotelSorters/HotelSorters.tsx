import { FC, useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { fieldSortersArrWithIcons } from "./fieldSortersArr";
import { useSearch } from "../../../hooks/useGlobal";

type PropsType = {
  totHotels: number;
  destination: string;
};

const HotelSorters: FC<PropsType> = ({ totHotels, destination }) => {
  const { sorterStars, sorterPrice, handleChangeSorter } = useSearch();

  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLUListElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [sibActive, setSibActive] = useState(false);

  useEffect(() => {
    const handleClickOut = (e: MouseEvent) => {
      if (
        dropRef.current &&
        parentRef.current &&
        !dropRef?.current.contains(e.target as Node) &&
        !parentRef?.current.contains(e.target as Node)
      )
        setDropOpen(false);
    };

    if (dropOpen) document.addEventListener("mousedown", handleClickOut);

    return () => document.removeEventListener("mousedown", handleClickOut);
  }, [dropOpen]);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-[250px_1fr_1fr] md:col-span-2 gap-10 sm:gap-5 overflow-visible">
      <span className="font-semibold text-3xl ml-2 justify-self-start lg:col-start-2">
        {totHotels
          ? destination
            ? `${totHotels} Hotel${
                totHotels > 1 ? "s" : ""
              } Found in ${destination}`
            : `Hotel${totHotels > 1 ? "s" : ""} Found: ${totHotels}`
          : destination
          ? `No Hotels Found in ${destination}`
          : "No Hotels Found"}
      </span>

      <div className="justify-self-end md:col-start-3 h-[50px] relative w-[250px] z-30">
        <div
          ref={parentRef}
          onClick={() => {
            setDropOpen(!dropOpen);
            setSibActive(!sibActive);
          }}
          onMouseOver={() => {
            setDropOpen(true);
            setSibActive(true);
          }}
          onMouseLeave={() => {
            setDropOpen(false);
            setSibActive(false);
          }}
          className={`border-2 border-green-600 w-full rounded-2xl bg-neutral-950 absolute cursor-pointer grid grid-cols-1 gap-4 right-0 -top-2 transition-all duration-300 pt-4  ${
            dropOpen ? "pb-5" : ""
          }`}
        >
          <div className="grid grid-cols-2 px-5">
            <span className="font-bold text-xl">Sort By:</span>

            <FaChevronDown
              size={25}
              className={`hover:text-green-600 transition-all duration-300 cursor-pointer ${
                dropOpen ? "rotate-180" : "rotate-0"
              } justify-self-end`}
            />
          </div>

          <ul
            ref={dropRef}
            onMouseOver={() => {
              const sib = parentRef?.current;
              if (sib && sibActive)
                sib.dispatchEvent(
                  new MouseEvent("mouseover", { bubbles: true })
                );
            }}
            onMouseLeave={() => {
              const sib = parentRef?.current;
              if (sib && sibActive)
                sib.dispatchEvent(
                  new MouseEvent("mouseout", { bubbles: true })
                );
            }}
            className={`transition-all max-w-full duration-300 bg-neutral-950 w-[250px] ${
              dropOpen
                ? "cursor-pointer opacity-100 h-[215px]"
                : "pointer-events-none opacity-100 h-0"
            }`}
          >
            {fieldSortersArrWithIcons.map((el) => {
              const Icon = el.icon;
              return (
                <li
                  data-field={el.field}
                  data-val={el.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChangeSorter(e);
                  }}
                  key={el.id}
                  className={`flex w-full gap-4 items-center border-b-2 border-green-600 last:border-b-0 first:border-t-2 p-4 last:pb-0 hover:text-green-600 
                    bg-neutral-950 transition-all duration-300 relative ${
                      dropOpen
                        ? "cursor-pointer opacity-100"
                        : "pointer-events-none opacity-0"
                    } ${
                    el.field === "sorterPrice"
                      ? el.value === sorterPrice
                        ? "text-green-600"
                        : "text-[whitesmoke]"
                      : el.field === "sorterStars"
                      ? el.value === sorterStars
                        ? "text-green-600"
                        : "text-[whitesmoke]"
                      : ""
                  }`}
                >
                  <Icon size={20} />
                  <span>{el.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default HotelSorters;
