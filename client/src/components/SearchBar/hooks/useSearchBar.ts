import { useMemo, useRef } from "react";
import { useResponsiveSearchBar } from "./useResponsiveSearchBar";
import { useFocusInput } from "../../../hooks/useFocusInput";
import { useIsFetching } from "react-query";

export const useSearchBar = (
  adultCount: string,
  childCount: string,
  checkIn: Date,
  checkOut: Date
) => {
  const isFetchingUserHotels = useIsFetching({ queryKey: ["searchHotels"] });

  const searchRef = useRef<HTMLInputElement | null>(null);
  useFocusInput(searchRef);

  const { placeholderDest } = useResponsiveSearchBar();

  const dynamicValGuests: { [key: string]: string } = useMemo(
    () => ({
      adultCount,
      childCount,
    }),
    [adultCount, childCount]
  );
  const dynamicValDates: { [key: string]: Date | null } = useMemo(
    () => ({
      checkIn,
      checkOut,
    }),
    [checkIn, checkOut]
  );

  return {
    searchRef,
    placeholderDest,
    dynamicValGuests,
    dynamicValDates,
    isFetchingUserHotels,
  };
};
