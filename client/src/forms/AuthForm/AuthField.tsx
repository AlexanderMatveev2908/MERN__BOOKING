import { FC } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

type PropsType = {
  field: any;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  watch?: UseFormWatch<any>;
};

const AuthField: FC<PropsType> = ({ register, errors, field, watch }) => {
  const defOpt = {
    required: `${field.field} is required`,
    pattern: {
      value: field.reg,
      message: field.msg,
    },
  };

  const confirmOpt = {
    validate: (val: string) => {
      if (!val) {
        return field.msg;
      } else if (watch?.("password") !== val) {
        return "Passwords do not match";
      }
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 place-content-center gap-4">
      <label className="grid grid-cols-1 sm:col-span-3 sm:grid-cols-3 place-content-center gap-4 md:grid-cols-[150px_1fr] ">
        <span className="text-start ml-2 sm:ml-0 justify-self-start ">
          {field.field.slice(0, 1).toUpperCase() + field.field.slice(1)}
        </span>
        <input
          type={field.type}
          className="border-2 bg-[#222] border-green-600 rounded-full py-1 px-2 pl-3 font-normal outline-none flex-1 focus_input col-span-2 md:col-span-1"
          placeholder={field.placeholder}
          {...register(
            field.field,
            field.field === "confirmPassword" ? confirmOpt : defOpt
          )}
        />
      </label>

      <div className="w-full ml-2 sm:ml-0 sm:col-span-2 gap-4 sm:grid sm:grid-cols-[150px_1fr] ">
        {errors?.[field.field] && (
          <p className="text-red-500 text-sm font-normal w-full sm:col-start-2 px-2">
            {errors[field.field]?.message as string}
          </p>
        )}
      </div>
    </div>
  );
};
export default AuthField;
