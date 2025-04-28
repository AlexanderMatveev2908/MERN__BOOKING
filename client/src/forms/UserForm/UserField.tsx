import { FC } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { RegisterFieldType } from "../../pages/Register/registerFields";
import { LoginFieldType } from "../../pages/Login/loginFieldsArr";
import {
  LoginFormDataType,
  RegisterFormDataType,
} from "../../context/types/users";

export type PropsUserComponentType = {
  register: UseFormRegister<RegisterFormDataType | LoginFormDataType>;
  errors: FieldErrors<RegisterFormDataType | LoginFormDataType>;
  watch: UseFormWatch<RegisterFormDataType | LoginFormDataType>;
  field: RegisterFieldType | LoginFieldType;
};

const UserField: FC<PropsUserComponentType> = ({
  register,
  errors,
  watch,
  field,
}) => {
  const defOpt = {
    required: `${field.label} is required`,
    pattern: {
      value: field.pattern,
      message: field.msg,
    },
  };

  const confirmOpt = {
    validate: (val: string) => {
      if (!val) {
        return "You need to confirm the password";
      } else if (watch?.("password") !== val) {
        return "Passwords do not match";
      }
    },
  };

  const passwordOpt = {
    validate: (val: string) => {
      if (!val) return "password is required";
      else if (watch?.("email") === val)
        return "Password must be different from email";
    },
    pattern: {
      value: field.pattern,
      message: field.msg,
    },
  };

  return (
    <div
      className="flex w-full flex-col items-center g-2
    gap-2 text-[whitesmoke]"
    >
      <label className="text-sm font-bold w-full flex flex-col gap-3 max-w-[750px]">
        <span className="text-start w-full">{field.label}</span>
        <input
          type={field.type}
          className="border-2 w-full  border-green-600 rounded-full py-1 px-2 pl-3 font-normal outline-none flex-1 focus_input bg-[#222]"
          placeholder={field.placeholder}
          {...register(
            field.field,
            field.field === "password"
              ? passwordOpt
              : field.field === "confirmPassword"
              ? confirmOpt
              : defOpt
          )}
        />
      </label>
      {errors[field.field as keyof typeof errors] && (
        <p className="text-red-500 text-sm text-start w-full max-w-[750px]">
          {errors[field.field as keyof typeof errors]?.message as string}
        </p>
      )}
    </div>
  );
};
export default UserField;
