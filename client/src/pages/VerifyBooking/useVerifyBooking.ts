import { useSearchParams } from "react-router-dom";
import { useToast } from "../../hooks/useGlobal";
import { verifyBookingAPI } from "../../context/api/bookingsAPI";
import { useQuery } from "react-query";
import { MONGO_ID_REG } from "../../constants/regex";

export const useVerifyBooking = () => {
  const [searchParams] = useSearchParams();
  const { showToastMsg } = useToast();

  const session_id = searchParams.get("session_id");
  const bookingId = searchParams.get("bookingId");
  const validHotelId = MONGO_ID_REG.test?.(bookingId!);

  const { data, isLoading, isSuccess } = useQuery(
    ["verifyBooking", session_id],
    () => verifyBookingAPI(session_id!, bookingId!),
    {
      enabled: !!session_id || !!validHotelId,
      onSuccess: (data: any) => {
        const { booking: { status } = {} } = data ?? {};
        if (status === "confirmed")
          showToastMsg("Payment successful", "SUCCESS");
        else if (status === "pending")
          showToastMsg("Payment pending", "SUCCESS");
        else if (status === "cancelled")
          showToastMsg("Booking cancelled", "ERROR");
      },
      onError: () => {
        showToastMsg("Error verifying payment", "ERROR");
      },
    }
  );

  const { booking: { _id } = {} } = data ?? {};

  return { isLoading, isSuccess, _id };
};
