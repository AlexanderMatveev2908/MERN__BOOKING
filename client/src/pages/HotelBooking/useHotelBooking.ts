import { useQuery } from "react-query";
import { getUserInfoAPI } from "../../context/api/usersApi";
import { useScrollTop } from "../../hooks/useScrollTop";
import { useNavHooks, useSearch, useToast } from "../../hooks/useGlobal";
import { useParams } from "react-router-dom";
import { MONGO_ID_REG } from "../../constants/regex";
import { useMemo } from "react";
import { getSingleHotelAPI } from "../../context/api/searchAPI";
import { formatDateForUser, formatDateForUTC } from "../../utils/formatDate";
import { createPaymentIntentAPI } from "../../context/api/bookingsAPI";

export const useHotelBooking = () => {
  useScrollTop();

  const { navigate } = useNavHooks();
  const { showToastMsg } = useToast();

  const { hotelId } = useParams();
  const isValidId = MONGO_ID_REG.test(hotelId ?? "");

  const { checkIn, checkOut, adultCount, childCount } = useSearch();

  const valsToPassToChildren = useMemo(
    () => ({
      checkIn: formatDateForUser(checkIn),
      checkOut: formatDateForUser(checkOut),
      adultCount,
      childCount,
      noNights: Math.ceil((checkOut.getTime() - checkIn.getTime()) / 86400000),
    }),
    [checkIn, checkOut, adultCount, childCount]
  );

  const { noNights } = valsToPassToChildren;

  const { data: dataUserInfo, isLoading: isLoadingUserInfo } = useQuery(
    "userInfo",
    getUserInfoAPI
  );

  const { data: dataHotel, isLoading: isLoadingHotel } = useQuery(
    "hotelForCheckout",
    () => getSingleHotelAPI(hotelId!),
    {
      enabled: isValidId,
    }
  );

  const { data: dataPaymentIntent, isLoading: isLoadingPaymentIntent } =
    useQuery(
      "paymentIntent",
      () =>
        createPaymentIntentAPI(hotelId!, {
          adultCount: adultCount + "",
          childCount: childCount || 0 + "",
          checkIn: formatDateForUTC(checkIn).toISOString(),
          checkOut: formatDateForUTC(checkOut).toISOString(),
        }),
      {
        enabled: isValidId && noNights > 0,
        onError: (err: any) => {
          showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
          navigate("/");
        },
      }
    );

  const isLoading = [
    isLoadingUserInfo,
    isLoadingHotel,
    isLoadingPaymentIntent,
  ].some((el) => el);

  return {
    dataUserInfo,
    dataHotel,
    valsToPassToChildren,
    isLoading,
    dataPaymentIntent,
  };
};
