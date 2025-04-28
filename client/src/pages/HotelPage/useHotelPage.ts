import { useQuery } from "react-query";
import { useSearch } from "../../hooks/useGlobal";
import { getSingleHotelAPI } from "../../context/api/searchAPI";
import { useScrollTop } from "../../hooks/useScrollTop";
import { useParams } from "react-router-dom";
import { MONGO_ID_REG } from "../../constants/regex";

export const useHotelPage = () => {
  useScrollTop();

  const { checkIn, checkOut } = useSearch();

  const paramsForAPI = new URLSearchParams({
    checkIn: checkIn?.toISOString() || new Date().toISOString(),
    checkOut:
      checkOut?.toISOString() || new Date(Date.now() + 86400000).toISOString(),
  });

  const { hotelId } = useParams();
  const isValidObjectId = MONGO_ID_REG.test(hotelId!);

  const {
    data: dataHotel,
    isLoading: isLoadingHotel,
    isError: isErrorHotel,
  } = useQuery(
    ["hotelPage", hotelId],
    () => getSingleHotelAPI(hotelId as string, paramsForAPI),
    {
      enabled: !!isValidObjectId,
    }
  );

  const { hotel } = dataHotel ?? {};

  return { isLoadingHotel, isErrorHotel, isValidObjectId, hotel };
};
