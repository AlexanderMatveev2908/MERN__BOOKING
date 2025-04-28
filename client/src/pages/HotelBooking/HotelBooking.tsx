import { FC } from "react";
import { useHotelBooking } from "./useHotelBooking";
import SpinnerDot from "../../components/SpinnerDot/SpinnerDot";
import BookingForm from "../../forms/BookingForm/BookingForm";
import DetailsBookingSummary from "../../components/DetailsBookingSummary/DetailsBookingSummary";
import { SearchedHotelFetchedType } from "../../context/types/search";
import { Elements } from "@stripe/react-stripe-js";
import { useStripePromise } from "../../hooks/useGlobal";

const HotelBooking: FC = () => {
  const {
    dataUserInfo,
    dataHotel,
    isLoading,
    valsToPassToChildren,
    dataPaymentIntent,
  } = useHotelBooking();

  const stripePromise = useStripePromise();

  return isLoading ? (
    <SpinnerDot />
  ) : (
    <div className="grid grid-cols-1 w-full place-content-center justify-items-center gap-y-5">
      <h1 className="text-2xl sm:text-3xl font-bold">BOOKING DETAILS</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 w-[80%] sm:w-[90%] md:w-full">
        {dataUserInfo && dataHotel && dataPaymentIntent && (
          <>
            <DetailsBookingSummary
              {...{
                hotel: dataHotel.hotel as SearchedHotelFetchedType,
                searchVals: valsToPassToChildren,
              }}
            />
            <Elements
              stripe={stripePromise}
              options={{ clientSecret: dataPaymentIntent.clientSecret }}
            >
              <BookingForm
                {...{
                  user: dataUserInfo?.user,
                  dataPayment: dataPaymentIntent,
                }}
              />
            </Elements>
          </>
        )}
      </div>
    </div>
  );
};
export default HotelBooking;
