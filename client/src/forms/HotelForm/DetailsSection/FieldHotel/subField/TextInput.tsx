import { FC } from "react";
import { PropsType } from "../FieldHotel";
import { REG_PRICE } from "../../../../../constants/regex";

const TextInput: FC<PropsType> = ({ register, field, defOpt }) => {
  const priceOpt = {
    required: "Price is required",
    pattern: {
      value: REG_PRICE,
      message:
        "invalid format, price must be a number and  can contain at most 2 floating numbers",
    },
    min: {
      value: 0.01,
      message: "price must be greater than 0.01",
    },
  };
  return (
    <input
      type={field.type}
      className="border-2 bg-[#222] border-green-600 rounded-full py-1 px-2 pl-3 font-normal outline-none flex-1 text-base focus_input"
      placeholder={`${field.label}...`}
      {...register(
        field.field,
        field.field === "pricePerNight" ? priceOpt : defOpt
      )}
    />
  );
};
export default TextInput;
