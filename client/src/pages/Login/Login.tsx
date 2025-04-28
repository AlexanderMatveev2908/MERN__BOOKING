import UserField from "../../forms/UserForm/UserField";
import { loginFieldsArr } from "./loginFieldsArr";
import { FC } from "react";
import SwitchUserForm from "../../forms/UserForm/SwitchUserForm";
import { useLogin } from "./useLogin";

const Login: FC = () => {
  const { loginFields, loginWatch, loginErrors, handleLogin, loginLoading } =
    useLogin();

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-5 items-center">
      <h2 className="text-3xl font-bold">Login</h2>

      <div className="flex flex-col items-center w-full gap-4">
        {loginFieldsArr.map((field) => (
          <UserField
            key={field.id}
            {...{
              register: loginFields,
              errors: loginErrors,
              watch: loginWatch,
              field,
            }}
          />
        ))}
      </div>

      <button disabled={loginLoading} type="submit" className="user__btn btn">
        {loginLoading ? "Logging..." : "Login"}
      </button>

      <SwitchUserForm {...{ formType: "login" }} />
    </form>
  );
};
export default Login;
