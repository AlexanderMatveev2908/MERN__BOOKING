import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { hotelTypesOpt } from "../../../config/hotelTypeOpt";
import { HotelFormDataType } from "../../../context/types/hotels";

const HotelTypeSection: FC = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormDataType>();
  const typeWatcher = watch("type");

  return (
    <div className="text-[whitesmoke]">
      <h2 className="text-2xl font-bold mb-3">Type</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-start gap-2">
        {hotelTypesOpt.map((opt) => (
          <label
            key={opt}
            className={`${
              opt === typeWatcher ? "bg-green-600 text-[#222]" : "bg-[#222]"
            } border-2 border-green-600 cursor-pointer text-sm  rounded-full  px-4 py-2 font-semibold w-full`}
          >
            <input
              type="radio"
              value={opt}
              {...register("type", {
                required: "You must chose at least one type for your hotel",
              })}
              className="hidden"
            />

            <span>{opt}</span>
          </label>
        ))}
      </div>

      {errors.type && (
        <span className="text-red-500 text-sm font-normal ml-1">
          {errors.type.message as string}
        </span>
      )}
    </div>
  );
};
export default HotelTypeSection;
