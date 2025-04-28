import { useState } from "react";
import { useSearchVals } from "./useSearchPage";
import { useQuery } from "react-query";
import { useUpdateUIScroll } from "./useUpdateUIScroll";
import { searchHotelsAPI } from "../../../context/api/searchAPI";

export const useSearchHotels = () => {
  const [currPage, setCurrPage] = useState(1);

  const { searchVals, paramsForAPI } = useSearchVals({ currPage });

  const { data: hotelsData, isLoading: searchedLoading } = useQuery(
    ["searchHotels", searchVals],
    () => searchHotelsAPI(paramsForAPI)
  );

  const { hotels = [], totalPages = 1, totHotels } = hotelsData ?? {};

  useUpdateUIScroll({
    totHotels,
    totalPages,
    currPage,
    setCurrPage,
  });

  return {
    searchVals,
    searchedLoading,
    hotels,
    totHotels,
    currPage,
    setCurrPage,
    totalPages,
  };
};
