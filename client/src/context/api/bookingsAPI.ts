import { axiosInstance } from "../../constants/instances";

export const bookHotelAPI = async ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  hotelId,
}: {
  [key: string]: any;
}) => {
  const { data } = await axiosInstance.post("/bookings/", {
    checkIn,
    checkOut,
    adultCount,
    childCount,
    hotelId,
  });
  return data;
};

export const verifyBookingAPI = async (
  session_id: string,
  bookingId: string
) => {
  const { data } = await axiosInstance.get(
    `/bookings/verify?${
      session_id ? `session_id=${session_id}` : `bookingId=${bookingId}`
    }
    `
  );

  return data;
};

export const createPaymentIntentAPI = async (hotelId: string, vals: any) => {
  const { data } = await axiosInstance.post(
    `/bookings/${hotelId}/payment-intent`,
    vals
  );

  return data;
};

export const pollBookingAPI = async (paymentIntentId: string) => {
  const { data } = await axiosInstance.get(
    `/bookings/status/polling?paymentIntentId=${paymentIntentId ?? ""}`
  );

  return data;
};

export const getBookingsAsUserAPI = async (currPage: string) => {
  const { data } = await axiosInstance.get(
    `/bookings/guest?page=${currPage}&limit=6`
  );
  return data;
};

export const getBookingsAsAdmin = async (currPage: string) => {
  const { data } = await axiosInstance.get(
    `/bookings/admin?page=${currPage}&limit=6`
  );
  return data;
};

export const refundBookingAPI = async (bookingId: string) => {
  const { data } = await axiosInstance.delete(`/bookings/refund/${bookingId}`);
  return data;
};
