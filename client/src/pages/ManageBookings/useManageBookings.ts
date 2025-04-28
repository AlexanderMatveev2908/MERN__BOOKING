import { useQuery } from "react-query";
import { getBookingsAsAdmin } from "../../context/api/bookingsAPI";
import { useEffect, useState } from "react";

export const useManageBookings = () => {
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  }, [currPage]);

  const { data: dateManageBookings, isLoading: isLoadingManageBookings } =
    useQuery(["manageBookings", currPage], () =>
      getBookingsAsAdmin(currPage + "")
    );

  const { bookings = [], totPages = 0 } = dateManageBookings ?? ({} as any);

  return {
    bookings,
    isLoadingManageBookings,
    currPage,
    setCurrPage,
    totPages,
  };
};
