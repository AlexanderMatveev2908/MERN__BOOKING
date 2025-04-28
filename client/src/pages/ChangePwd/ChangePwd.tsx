import { FC } from "react";
import AuthField from "../../forms/AuthForm/AuthField";
import { Navigate } from "react-router-dom";
import { fieldsChangePwd } from "./fieldsChangePwd";
import { useChangePwd } from "./useChangePwd";

export type FormDataPwd = {
  password: string;
  confirmPassword: string;
};

const ChangePwd: FC = () => {
  const {
    isValidId,
    isValidToken,
    hasToWritePwd,
    handleSave,
    register,
    errors,
    watch,
    sendingPwd,
  } = useChangePwd();

  return hasToWritePwd && isValidId && isValidToken ? (
    <form
      onSubmit={handleSave}
      className="border-2 border-green-600 p-5 pt-16  rounded-xl w-full mt-5 flex flex-col gap-5"
    >
      {fieldsChangePwd.map((field) => (
        <AuthField key={field.field} {...{ register, errors, field, watch }} />
      ))}

      <div className="flex w-full justify-center">
        <button disabled={sendingPwd} type="submit" className="btn">
          {sendingPwd ? "Changing password..." : "Change password"}
        </button>
      </div>
    </form>
  ) : (
    <Navigate to="/user/send-email-change-pwd" replace={true} />
  );
};
export default ChangePwd;
