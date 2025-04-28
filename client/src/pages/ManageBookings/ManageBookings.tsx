import { FC } from "react";
import { useManageBookings } from "./useManageBookings";
import SpinnerDot from "../../components/SpinnerDot/SpinnerDot";
import ManageBookingsItem from "./components/ManageBookingsItem";
import { BookingFetchedType } from "../../context/types/bookings";
import BlockPages from "../../components/BlockPages/BlockPages";

const ManageBookings: FC = () => {
  const { bookings, isLoadingManageBookings, currPage, setCurrPage, totPages } =
    useManageBookings();

  return isLoadingManageBookings ? (
    <SpinnerDot />
  ) : (
    <div className="grid grid-cols-1 w-full place-content-center justify-items-center gap-y-5 relative pb-[100px]">
      <h1 className="text-2xl sm:text-3xl font-bold ">MANAGE BOOKINGS</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-[80%] sm:w-[90%] md:w-full max-w-full">
        {!!bookings?.length &&
          bookings.map((booking: BookingFetchedType) => (
            <ManageBookingsItem key={booking._id} {...{ booking }} />
          ))}
      </div>

      <BlockPages {...{ currPage, setCurrPage, totalPages: totPages }} />
    </div>
  );
};
export default ManageBookings;
