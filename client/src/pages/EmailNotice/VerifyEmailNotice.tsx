import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useEmailNotice } from "./useEmailNotice";

const EmailNotice: FC = () => {
  const { isVerifyingEmail, isChangingPwd, msg } = useEmailNotice();

  return isVerifyingEmail || isChangingPwd ? (
    <div className="w-full flex justify-center">
      <h1 className="text-xl font-bold">
        You are nearly there, check your email{msg}💪🏽💪🏽💪🏽🔥🔥🔥
      </h1>
    </div>
  ) : (
    <Navigate to="/" replace={true} />
  );
};
export default EmailNotice;
