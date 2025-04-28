import { FC, useState } from "react";
import AvailableGuestsHotel from "./components/AvailableGuestsHotel";
import { SearchedHotelFetchedType } from "../../context/types/search";
import { useGuestForm } from "./hooks/useGuestForm";
import SpanDates from "./components/SpanDates";
import { priceFormatter } from "../../utils/priceFormatter";
import { useUserErrors } from "./hooks/useUserErrors";
import GuestFields from "./components/GuestFields";
import DateFields from "./components/DateFields";
import { useGetFreshNumGuests } from "./hooks/useGetFreshNumGuests";
import { useMakeDynamicVal } from "./hooks/useMakeDynamicVal";
import { useUsers } from "../../hooks/useGlobal";
// import CouponField from "./components/CouponField";

type PropsType = {
  hotel: SearchedHotelFetchedType;
};

const GuestForm: FC<PropsType> = ({ hotel }) => {
  const [errorGuests, setErrorsGuests] = useState<{ [key: string]: string }>(
    {}
  );
  const { isLogged } = useUsers();

  const {
    checkIn,
    checkOut,
    adultCount,
    childCount,
    handleChangeSearchDate,
    handleChangeSearch,
    handleSignInClick,
    handleCLickForLogged,
    // isLoadingBooking,
  } = useGuestForm();

  const { dynamicValDates, dynamicValGuests } = useMakeDynamicVal(
    adultCount,
    childCount,
    checkIn,
    checkOut
  );

  const { isLoadingGuests, availableAdults, availableChildren } =
    useGetFreshNumGuests({
      checkIn,
      checkOut,
    });

  useUserErrors({
    adultCount: +adultCount,
    childCount: +childCount,
    availableAdults,
    availableChildren,
    setErrorsGuests,
  });

  return (
    <div className="w-[80%] sm:w-[90%] md:w-full flex flex-col gap-5">
      <span className="text-lg sm:text-xl font-semibold">Available Guests</span>

      <SpanDates
        {...{
          checkIn,
          checkOut,
        }}
      />

      <AvailableGuestsHotel
        {...{
          adultCount: hotel.adultCount,
          childCount: hotel.childCount,
          availableAdults,
          availableChildren,
          isLoadingGuests,
        }}
      />

      <div className="flex flex-col gap-5 border-2 border-green-600 p-5 rounded-xl">
        <div>
          <span className="text-lg sm:text-xl font-bold">
            {priceFormatter(hotel.pricePerNight)}&nbsp;Per Night
          </span>
        </div>

        <form
          onSubmit={handleCLickForLogged}
          className="w-full grid grid-cols-1 gap-y-5 gap-x-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-2 gap-x-5 w-full gap-y-3">
            <DateFields
              {...{
                dynamicValDates,
                checkIn,
                checkOut,
                handleChangeSearchDate,
              }}
            />
            <GuestFields
              {...{
                dynamicValGuests,
                handleChangeSearch,
                errorGuests,
              }}
            />
          </div>

          <div className="grid grid-cols-1 justify-self-center w-full self-start h-full gap-y-5">
            {/* <CouponField /> */}

            <button
              // disabled={
              //   !!Object.keys(errorGuests ?? {})?.length || isLoadingBooking
              // }
              disabled={!!Object.keys(errorGuests ?? {})?.length}
              type={isLogged ? "submit" : "button"}
              onClick={() => !isLogged && handleSignInClick()}
              // className={`search_hotels__btn h-fit max-w-[250px] md:max-w-[300px] self-end
              //   ${
              //     isLoadingBooking
              //       ? "disabled:cursor-wait"
              //       : "disabled:opacity-50"
              //   }
              // transition-all duration-300`}
              className="search_hotels__btn h-fit max-w-[250px] md:max-w-[300px] self-end transition-all duration-300 disabled:opacity-50"
            >
              <span className="text-lg sm:text-xl z-30 relative font-semibold">
                {/* {isLogged && isLoadingBooking
                  ? "Booking..."
                  : isLogged && !isLoadingBooking
                  ? "Book Now"
                  : "Sign In To Book"} */}
                {isLogged ? "Book Now" : "Sign In To Book"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default GuestForm;
