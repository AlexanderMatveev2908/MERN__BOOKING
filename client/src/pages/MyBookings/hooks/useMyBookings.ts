import { useQuery } from "react-query";
import { getBookingsAsUserAPI } from "../../../context/api/bookingsAPI";
import { useEffect, useState } from "react";

export const useMyBookings = () => {
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  }, [currPage]);

  const { data: dataMyBookings, isLoading: isLoadingMyBookings } = useQuery(
    ["myBookings", currPage],
    () => getBookingsAsUserAPI(currPage + "")
  );

  const { bookings = [], totPages = 0 } = dataMyBookings ?? {};

  return {
    bookings,
    isLoadingMyBookings,
    currPage,
    setCurrPage,
    totPages,
  };
};
