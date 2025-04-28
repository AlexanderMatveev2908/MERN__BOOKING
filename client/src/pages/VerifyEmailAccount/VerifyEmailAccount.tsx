import { FC } from "react";
import SpinnerDot from "../../components/SpinnerDot/SpinnerDot";
import { Navigate } from "react-router-dom";
import { useVerifyEmailAccount } from "./useVerifyEmailAccount";

const VerifyEmailAccount: FC = () => {
  const { isLoading, isSuccess } = useVerifyEmailAccount();

  return isLoading ? (
    <SpinnerDot />
  ) : isSuccess ? (
    <Navigate to="/" replace={true} />
  ) : (
    <Navigate to="/user/send-email-verify-account" replace={true} />
  );
};
export default VerifyEmailAccount;
