import { multiRowFields, registerFieldsArr } from "./registerFields";
import { FC } from "react";
import UserField, {
  PropsUserComponentType,
} from "../../forms/UserForm/UserField";
import SwitchUserForm from "../../forms/UserForm/SwitchUserForm";
import { useRegister } from "./useRegister";

const Register: FC = () => {
  const {
    registerFields,
    registerWatch,
    registerErrors,
    handleRegister,
    registerLoading,
  } = useRegister();

  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col gap-5 items-center"
    >
      <h2 className="text-3xl font-bold">Create an Account</h2>

      <div className="w-full flex flex-col gap-2">
        {registerFieldsArr.map((field, i, arg) => {
          if (!multiRowFields.includes(field.field)) {
            return (
              <UserField
                key={field.id}
                {...({
                  register: registerFields,
                  errors: registerErrors,
                  watch: registerWatch,
                  field,
                } as PropsUserComponentType)}
              />
            );
          } else {
            if (arg[i + 1] && multiRowFields.includes(arg[i + 1].field)) {
              return (
                <div
                  key={field.id + arg[i + 1].id}
                  className="flex flex-col sm:flex-row sm:gap-5 sm:max-w-[750px] m-auto w-full"
                >
                  <UserField
                    {...({
                      register: registerFields,
                      errors: registerErrors,
                      field,
                      watch: registerWatch,
                    } as PropsUserComponentType)}
                  />

                  <UserField
                    {...({
                      register: registerFields,
                      errors: registerErrors,
                      field: arg[i + 1],
                      watch: registerWatch,
                    } as PropsUserComponentType)}
                  />
                </div>
              );
            }
          }
        })}
      </div>

      <button
        type="submit"
        className="user__btn btn"
        disabled={registerLoading}
      >
        {registerLoading ? "Creating Account" : "Create Account"}
      </button>

      <SwitchUserForm {...{ formType: "register" }} />
    </form>
  );
};
export default Register;
