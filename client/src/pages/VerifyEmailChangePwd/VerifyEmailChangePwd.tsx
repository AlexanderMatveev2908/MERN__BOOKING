import { Navigate } from "react-router-dom";
import SpinnerDot from "../../components/SpinnerDot/SpinnerDot";
import { useVerifyEmailChangePwd } from "./useVerifyEmailChangePwd";

const VerifyEmailChangePwd = () => {
  const { isLoading, isSuccess, token, userId } = useVerifyEmailChangePwd();

  return isLoading ? (
    <SpinnerDot />
  ) : isSuccess ? (
    <Navigate
      to={`/user/change-pwd?token=${token}&userId=${userId}`}
      replace={true}
    />
  ) : (
    <Navigate to={`/user/send-email-change-pwd`} replace={true} />
  );
};
export default VerifyEmailChangePwd;
