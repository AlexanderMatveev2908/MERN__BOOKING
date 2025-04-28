import { useState } from "react";
import { useQuery } from "react-query";
import { getHotelsAsAdminAPI } from "../../context/api/hotelAPI";
import { useScrollTop } from "../../hooks/useScrollTop";

export const useMyHotels = () => {
  const [currPage, setCurrPage] = useState(1);

  useScrollTop();

  const { data: adminHotelsData, isLoading } = useQuery(
    ["hotelsAdmin", currPage],
    () => getHotelsAsAdminAPI(currPage)
  );

  const { hotels = [], totalPages = 0 } = adminHotelsData ?? {};

  return {
    isLoading,
    hotels,
    totalPages,
    currPage,
    setCurrPage,
  };
};
