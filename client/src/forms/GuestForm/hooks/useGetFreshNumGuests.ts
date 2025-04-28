import { useQuery } from "react-query";
import { getSingleHotelAPI } from "../../../context/api/searchAPI";
import { useParams } from "react-router-dom";

export const useGetFreshNumGuests = ({
  checkIn,
  checkOut,
}: {
  [key: string]: Date;
}) => {
  const paramsForAPI = new URLSearchParams({
    checkIn: checkIn?.toISOString() || new Date().toISOString(),
    checkOut:
      checkOut?.toISOString() || new Date(Date.now() + 86400000).toISOString(),
  });
  const { hotelId } = useParams();

  const { isLoading: isLoadingGuests, data: dataGuests } = useQuery(
    ["freshGuests", checkIn, checkOut],
    () => getSingleHotelAPI(hotelId as string, paramsForAPI)
  );
  const { hotel: { availableAdults = 0, availableChildren = 0 } = {} } =
    dataGuests ?? {};

  return {
    isLoadingGuests,
    availableAdults,
    availableChildren,
  };
};
