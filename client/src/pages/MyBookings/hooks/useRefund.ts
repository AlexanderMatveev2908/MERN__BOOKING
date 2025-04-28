import { useMutation, useQueryClient } from "react-query";
import { refundBookingAPI } from "../../../context/api/bookingsAPI";
import { useToast } from "../../../hooks/useGlobal";

export const useRefund = ({ setPopup }: any) => {
  const queryClient = useQueryClient();
  const { showToastMsg } = useToast();

  const { mutate, isLoading: isLoadingRefund } = useMutation(refundBookingAPI, {
    onSuccess: async () => {
      showToastMsg("Refund Booking Successful", "SUCCESS");
      setPopup(false);
      await queryClient.refetchQueries({
        queryKey: ["myBookings"],
        exact: false,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });

  const handleRefund = (bookingId: string) => {
    mutate(bookingId);
  };

  return {
    isLoadingRefund,
    handleRefund,
  };
};
