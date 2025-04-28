import { useForm } from "react-hook-form";
import { User } from "../BookingForm";
import { PaymentIntentType } from "../../../context/types/bookings";
import { useParams } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavHooks, useToast } from "../../../hooks/useGlobal";
import { MONGO_ID_REG } from "../../../constants/regex";
import { Stripe, StripeCardElement, StripeElements } from "@stripe/stripe-js";
import { useState } from "react";
import { useBookingStatus } from "./useBookingStatus";

export const useBookingForm = ({
  user,
  dataPayment,
}: {
  user: User;
  dataPayment: PaymentIntentType;
}) => {
  const { showToastMsg } = useToast();
  const { navigate } = useNavHooks();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  const stripe = useStripe();
  const elements = useElements();

  const { hotelId } = useParams();
  const isValidId = MONGO_ID_REG.test(hotelId ?? "");

  const { register } = useForm<User>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    },
  });

  useBookingStatus(paymentId!);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      [stripe, isValidId, dataPayment?.paymentIntentId, elements, hotelId].some(
        (val) => !val
      )
    )
      return;

    setIsProcessing(true);

    try {
      const { paymentIntent, error } = await (
        stripe as Stripe
      ).confirmCardPayment(dataPayment.clientSecret, {
        payment_method: {
          card: (elements as StripeElements).getElement(
            CardElement
          ) as StripeCardElement,
        },
      });

      if (error) {
        showToastMsg(error.message ?? "Payment Failed", "ERROR");
        setIsProcessing(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") setPaymentId(paymentIntent.id);
    } catch (err: any) {
      console.log(err);
      showToastMsg(
        "Something went wrong, Don't worry we are working on it 🔨🔨🔨",
        "ERROR"
      );
      setIsProcessing(false);
      navigate("/guest/my-bookings");
    }
  };

  return {
    register,
    handleBook,
    isProcessing,
  };
};
