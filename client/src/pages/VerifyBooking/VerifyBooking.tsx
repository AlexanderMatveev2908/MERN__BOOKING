import { FC } from "react";
import { useVerifyBooking } from "./useVerifyBooking";
import SpinnerDot from "../../components/SpinnerDot/SpinnerDot";
import { Navigate } from "react-router-dom";

const VerifyBooking: FC = () => {
  const { isLoading, isSuccess, _id } = useVerifyBooking();

  return isLoading ? (
    <SpinnerDot />
  ) : isSuccess ? (
    <Navigate to={`/guest/booking/${_id}`} replace={true} />
  ) : (
    <Navigate to="/" replace={true} />
  );
};
export default VerifyBooking;
