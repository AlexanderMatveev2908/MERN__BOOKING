import { FC } from "react";
import { PropsType } from "../FieldHotel";

const SelectInput: FC<PropsType> = ({ register, field }) => {
  return (
    <select
      {...register(field.field, {
        required: `${field.label} is required`,
      })}
      className="border-2 bg-[#222] border-green-600 outline-none rounded-xl py-1 px-2 focus_input"
    >
      <option className="text-sm font-bold">Select a Rating</option>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
        <option key={i} value={i}>
          {i}
        </option>
      ))}
    </select>
  );
};
export default SelectInput;
