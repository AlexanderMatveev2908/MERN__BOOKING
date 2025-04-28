import { useMemo } from "react";

export const useMakeDynamicVal = (
  adultCount: string,
  childCount: string,
  checkIn: Date,
  checkOut: Date
) => {
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

  return { dynamicValGuests, dynamicValDates };
};
