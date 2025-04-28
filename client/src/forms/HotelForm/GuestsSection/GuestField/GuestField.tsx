import { FC } from "react";
import { HotelFormDataType } from "../../../../context/types/hotels";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { GuestFieldType } from "../guestsFields";

type PropsType = {
  register: UseFormRegister<HotelFormDataType>;
  errors: FieldErrors<HotelFormDataType>;
  field: GuestFieldType;
};

const GuestField: FC<PropsType> = ({ register, errors, field }) => {
  const validateAdult = (val: number) => {
    if (val < 1) return "You must at least host 1 adult in your hotel";

    return true;
  };

  return (
    <label className="text-sm flex flex-col font-semibold gap-3">
      <span>{field.label}</span>
      <input
        type="number"
        min={field.field === "adultCount" ? 1 : 0}
        {...register(field.field, {
          required: `${field.label} is required`,
          pattern: {
            value: /^\d+$/,
            message: `You can not host a negative or decimal number of guest`,
          },
          validate: field.field === "adultCount" ? validateAdult : undefined,
        })}
        className="focus_input bg-[#222] border-2 border-green-600 rounded-full py-1 px-2 pl-3 font-normal outline-none text-base w-full"
      />

      {errors[field.field] && (
        <span className="text-red-500 text-sm font-normal ml-1">
          {errors[field.field]?.message as string}
        </span>
      )}
    </label>
  );
};
export default GuestField;
