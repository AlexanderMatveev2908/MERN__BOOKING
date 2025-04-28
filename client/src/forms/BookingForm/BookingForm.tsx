import { FC } from "react";
import { fieldsArr } from "./fieldsArr";
import { PaymentIntentType } from "../../context/types/bookings";
import { priceFormatter } from "../../utils/priceFormatter";
import { CardElement } from "@stripe/react-stripe-js";
import { useBookingForm } from "./hooks/useBookingForm";
import { PulseLoader } from "react-spinners";
import InfoStripe from "./components/InfoStripe";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
};

type PropsType = {
  user: User;
  dataPayment: PaymentIntentType;
};

const BookingForm: FC<PropsType> = ({ user, dataPayment }) => {
  const { register, handleBook, isProcessing } = useBookingForm({
    user,
    dataPayment,
  });

  return (
    <form onSubmit={handleBook} className="grid auto-rows-min gap-y-5 h-fit">
      <div className="grid grid-cols-1 gap-y-4 w-full h-fit p-5 border-2 border-green-600 rounded-xl">
        <span className="font-bold text-xl sm:text-2xl">
          Confirm Your Details
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2 w-full">
          {fieldsArr.map((field) => (
            <label
              key={field.id}
              className={`grid grid-cols-1 items-center gap-y-2 ${
                field.field === "email" ? "sm:col-span-2" : ""
              }`}
            >
              <span className="font-semibold">{field.label}:</span>
              <input
                type={field.type}
                className="bg-transparent px-5 py-1 border-2 border-green-600 rounded-xl outline-none focus_input overflow-x-auto"
                readOnly
                disabled
                {...register(field.field as keyof User, { required: true })}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full grid auto-rows-min gap-y-5 p-5 border-2 border-green-600 rounded-xl place-items-start justify-items-start">
        <h1 className="font-bold text-xl sm:text-2xl">Your Price Summary</h1>

        <div className="w-full grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-5 items-center gap-y-2 md:grid-cols-1 lg:grid-cols-[120px_1fr]">
          <span className="text-lg sm:text-xxl font-semibold">Total Cost:</span>

          <div className="w-full grid grid-cols-1 lg:grid-cols-[100px_1fr] items-center">
            <span className="text-lg sm:text-xxl font-semibold">
              {priceFormatter(dataPayment.totalCost)}
            </span>

            <span className="text-sm">Includes taxes and charges</span>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 gap-y-3 sm:grid-cols-[200px_1fr] items-center md:grid-cols-1">
          <span className="text-lg font-semibold">Payment Details:</span>

          <CardElement
            id="payment-element"
            className="px-5 py-3 border-2 border-green-600 rounded-xl text-white text-lg font-semibold"
            options={{
              style: {
                base: {
                  color: "#ffffff",
                  fontSize: "16px",
                },
              },
            }}
          />
        </div>
        <InfoStripe />

        <div className="w-full flex justify-center">
          {isProcessing ? (
            <PulseLoader size={25} color="whitesmoke" />
          ) : (
            <button
              disabled={isProcessing}
              type="submit"
              className="px-5 py-2 border-green-600 border-2 rounded-xl outline-none pseudo_btn min-w-[250px] text-lg sm:text-xl font-bold hover:bg-green-600  cursor-pointer"
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
export default BookingForm;
