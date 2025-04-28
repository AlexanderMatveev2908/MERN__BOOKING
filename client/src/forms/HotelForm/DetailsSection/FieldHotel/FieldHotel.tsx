import { FC } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { FieldHotelType, makeLabel } from "../fieldsHotel";
import TextArea from "./subField/TextArea";
import TextInput from "./subField/TextInput";
import SelectInput from "./subField/SelectInput";
import { HotelFormDataType } from "../../../../context/types/hotels";
import { REG_HOTEL } from "../../../../constants/regex";

export type PropsHotelType = {
  register: UseFormRegister<HotelFormDataType>;
  errors: FieldErrors<HotelFormDataType>;
  watch?: UseFormWatch<HotelFormDataType>;
  field: FieldHotelType;
};

export type PropsType = {
  register: UseFormRegister<HotelFormDataType>;
  field: FieldHotelType;
  defOpt?: any;
};

const FieldHotel: FC<PropsHotelType> = ({ field, register, errors }) => {
  const defOpt = {
    required: `${field.label} is required`,
    pattern: {
      value: REG_HOTEL,
      message: `${field.label} can contain letters, numbers, spaces, commas, apostrophes, hyphens, and periods.[,'-.]`,
    },
  };

  return (
    <label className="w-full flex flex-col gap-1 max-h-fit">
      <span className="text-start ml-1 w-full text-base font-bold mb-1">
        {makeLabel(field.field)}
      </span>

      {field.field === "description" ? (
        <TextArea
          {...{
            register,
            field,
            defOpt,
          }}
        />
      ) : field.field === "starRating" ? (
        <SelectInput {...{ register, field, defOpt }} />
      ) : (
        <TextInput {...{ register, field, defOpt }} />
      )}

      {errors[field.field] && (
        <span className="text-red-500 text-sm font-normal ml-1">
          {errors[field.field]?.message as string}
        </span>
      )}
    </label>
  );
};
export default FieldHotel;
