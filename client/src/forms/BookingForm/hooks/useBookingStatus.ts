import { useQuery } from "react-query";
import { pollBookingAPI } from "../../../context/api/bookingsAPI";
import { useState } from "react";
import { useNavHooks, useToast } from "../../../hooks/useGlobal";

export const useBookingStatus = (paymentIntentId: string) => {
  const { showToastMsg } = useToast();
  const { navigate } = useNavHooks();

  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRY = 5;

  useQuery({
    queryKey: ["bookingStatus", paymentIntentId],
    queryFn: () => pollBookingAPI(paymentIntentId),
    onSuccess: (data: any) => {
      if (data?.booking?.status === "confirmed") {
        showToastMsg("Booking confirmed", "SUCCESS");
        navigate(`/guest/my-bookings`);
      }
    },
    onError: (err: any) => {
      if (retryCount >= MAX_RETRY) {
        console.log(err);
        showToastMsg(
          "Something went wrong, Don't worry we are working on it 🔨🔨🔨",
          "ERROR"
        );
        navigate("/guest/my-bookings");
      } else {
        setRetryCount((prev) => prev + 1);
      }
    },
    enabled: !!paymentIntentId && retryCount <= MAX_RETRY,
    refetchInterval: retryCount > MAX_RETRY ? 0 : 2000,
  });
};
