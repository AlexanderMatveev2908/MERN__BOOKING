import { useMemo } from "react";
import { useSearch } from "../../../hooks/useGlobal";
import { tomorrow } from "../../../utils/formatDate";

export const useSearchVals = ({ currPage }: { currPage: number }) => {
  const {
    destination,
    checkIn,
    checkOut,
    adultCount,
    childCount,
    hotelId,
    facilities,
    types,
    starRating,
    minPricePerNight,
    maxPricePerNight,
    sorterPrice,
    sorterStars,
  } = useSearch() as any;

  const searchVals = useMemo(
    () => ({
      destination,
      page: currPage,
      limit: "5",
      checkIn,
      checkOut,
      adultCount,
      childCount,
      hotelId,
      facilities,
      types,
      minPricePerNight: minPricePerNight,
      maxPricePerNight: maxPricePerNight,
      starRating,
      sorterPrice,
      sorterStars,
    }),
    [
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount,
      hotelId,
      currPage,
      facilities,
      types,
      starRating,
      minPricePerNight,
      maxPricePerNight,
      sorterPrice,
      sorterStars,
    ]
  );

  const paramsForAPI = new URLSearchParams({
    page: currPage + "",
    limit: "5",
    destination,
    checkIn: checkIn ? checkIn.toISOString() : new Date().toISOString(),
    checkOut: checkOut ? checkOut.toISOString() : tomorrow.toISOString(),
    adultCount: adultCount || "1",
    childCount: childCount || "0",
    starRating,
    minPricePerNight,
    maxPricePerNight,
    sorterStars,
    sorterPrice,
  });

  if (hotelId) paramsForAPI.append("hotelId", hotelId);
  if (facilities?.length && Array.isArray(facilities))
    paramsForAPI.set("facilities", facilities.join(","));
  if (types?.length && Array.isArray(types))
    paramsForAPI.set("types", types.join(","));
  if (starRating?.length && Array.isArray(starRating))
    paramsForAPI.set("starRating", starRating.join(","));

  return { searchVals, paramsForAPI };
};
