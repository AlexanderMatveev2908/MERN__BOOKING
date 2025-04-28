import { useEffect } from "react";
import { mediumVw } from "../../../constants/breakPoints";

export const useUpdateUIScroll = ({
  totHotels,
  totalPages,
  currPage,
  setCurrPage,
}: {
  totHotels: number;
  totalPages: number;
  currPage: number;
  setCurrPage: (val: number) => void;
}) => {
  useEffect(() => {
    setTimeout(() => {
      if (window.innerWidth < mediumVw)
        window.scrollTo({ top: 500, behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  }, [currPage]);

  useEffect(() => {
    if (totalPages <= 1 && totHotels <= 5) setCurrPage(1);
  }, [totalPages, totHotels, setCurrPage]);
};
