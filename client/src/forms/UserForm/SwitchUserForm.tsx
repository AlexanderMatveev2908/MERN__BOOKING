import { FC } from "react";
import { Link } from "react-router-dom";

type PropsType = {
  formType: string;
};
const SwitchUserForm: FC<PropsType> = ({ formType }) => {
  return (
    <div className="w-full flex justify-center items-center flex-col gap-2">
      <span className="text-sm">
        {formType === "login" ? "Don't have an'account?" : "Have an'account?"}
        &nbsp;
        <Link
          className="switch_user_form__link"
          to={`/user/${formType === "login" ? "register" : "login"}`}
        >
          {formType === "login" ? "Register" : "Login"}
        </Link>
      </span>
      {formType === "login" ? (
        <span className="text-sm">
          Forgot password?&nbsp;
          <Link
            className="switch_user_form__link"
            to="/user/send-email-change-pwd"
          >
            Recover it
          </Link>
        </span>
      ) : (
        <span className="text-sm">
          Email did not arrive?&nbsp;
          <Link
            className="switch_user_form__link"
            to="/user/send-email-verify-account"
          >
            Send me another
          </Link>
        </span>
      )}
    </div>
  );
};
export default SwitchUserForm;
