import { FC } from "react";
import { PropsType } from "../FieldHotel";

const TextArea: FC<PropsType> = ({ register, field, defOpt }) => {
  return (
    <textarea
      className="border-2 bg-[#222] border-green-600 rounded-3xl py-3 px-5 font-normal outline-none flex-1 text-base overflow-y-auto focus_input"
      rows={8}
      placeholder={`${field.label}...`}
      {...register(field.field, defOpt)}
    />
  );
};
export default TextArea;
