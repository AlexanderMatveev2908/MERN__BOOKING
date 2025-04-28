import { useFormContext } from "react-hook-form";
import { HotelFormDataType } from "../../../context/types/hotels";
import { hotelFacilitiesOpt } from "../../../config/hotelTypeOpt";
import { FC } from "react";

const FacilitiesSection: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormDataType>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 text-[whitesmoke]">Facilities</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-start gap-4 ">
        {hotelFacilitiesOpt.map((opt) => (
          <label
            key={opt}
            className="cursor-pointer flex gap-x-2 max-h-fit text-sm font-medium"
          >
            <input
              type="checkbox"
              value={opt}
              {...register("facilities", {
                required: "You must chose at least one facility for your hotel",
              })}
              className="cursor-pointer"
            />

            <span className="leading-5">{opt}</span>
          </label>
        ))}
      </div>

      {errors.facilities && (
        <span className="text-red-500 text-sm font-normal ml-1">
          {errors.facilities.message as string}
        </span>
      )}
    </div>
  );
};
export default FacilitiesSection;
