import { FC, useState } from "react";
import SpinnerDot from "../../components/SpinnerDot/SpinnerDot";
import { BookingFetchedType } from "../../context/types/bookings";
import MyBookingsItem from "./components/MyBookingsItem";
import PopupRefund from "./components/PopupRefund";
import { useMyBookings } from "./hooks/useMyBookings";
import { useRefund } from "./hooks/useRefund";
import BlockPages from "../../components/BlockPages/BlockPages";

const MyBookings: FC = () => {
  const { bookings, isLoadingMyBookings, currPage, setCurrPage, totPages } =
    useMyBookings();
  const [popup, setPopup] = useState(false);
  const [bookingIdRefundId, setBookingIdRefundId] = useState<string | null>(
    null
  );

  const { isLoadingRefund, handleRefund } = useRefund({ setPopup });

  return (
    <>
      <PopupRefund
        {...{
          popup,
          setPopup,
          isLoadingRefund,
          handleRefund,
          bookingIdRefundId,
          setBookingIdRefundId,
        }}
      />

      {isLoadingMyBookings ? (
        <SpinnerDot />
      ) : (
        <div className="grid grid-cols-1 w-full place-content-center justify-items-center gap-y-5 relative pb-[100px]">
          <h1 className="text-2xl sm:text-3xl font-bold ">MY BOOKINGS</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-[80%] sm:w-[90%] md:w-full max-w-full">
            {!!bookings?.length &&
              bookings.map((booking: BookingFetchedType) => (
                <MyBookingsItem
                  key={booking._id}
                  {...{ booking, setPopup, setBookingIdRefundId }}
                />
              ))}
          </div>

          <BlockPages {...{ currPage, setCurrPage, totalPages: totPages }} />
        </div>
      )}
    </>
  );
};
export default MyBookings;
