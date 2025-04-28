import { useEffect } from "react";

// IMPORTANT => no need of IIFE, did just for fun

export const useUserErrors = ({
  adultCount,
  childCount,
  availableAdults,
  availableChildren,
  setErrorsGuests,
}: any) => {
  useEffect(() => {
    if (adultCount > availableAdults)
      setErrorsGuests((prev: any) => ({
        ...prev,
        adultCount: "Adult count cannot exceed available adults",
      }));
    if (adultCount <= 0)
      setErrorsGuests((prev: any) => ({
        ...prev,
        adultCount: "Adult count cannot be less than or equal to 0",
      }));
    if (adultCount > 0 && adultCount <= availableAdults)
      setErrorsGuests((prev: any) => ({
        ...((prev) => {
          // eslint-disable-next-line
          const { adultCount: _, ...rest } = prev;

          return rest;
        })(prev),
      }));
    if (childCount > availableChildren)
      setErrorsGuests((prev: any) => ({
        ...prev,
        childCount: "Child count cannot exceed available children",
      }));
    if (childCount <= availableChildren)
      setErrorsGuests((prev: any) => ({
        ...((prev) => {
          // eslint-disable-next-line
          const { childCount: _, ...rest } = prev;

          return rest;
        })(prev),
      }));
  }, [
    adultCount,
    childCount,
    availableAdults,
    availableChildren,
    setErrorsGuests,
  ]);
};
