import { HotelFormDataType } from "../../../context/types/hotels";
import { guestsFieldsArr } from "./guestsFields";
import GuestField from "./GuestField/GuestField";
import { useFormContext } from "react-hook-form";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormDataType>();

  return (
    <div className="text-[whitesmoke]]">
      <h2 className="text-2xl font-bold mb-3">Guests</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 py-5 gap-5 bg-transparent border-2 border-green-600 rounded-xl px-5">
        {guestsFieldsArr.map((field) => (
          <GuestField key={field.id} {...{ register, field, errors }} />
        ))}
      </div>
    </div>
  );
};
export default GuestsSection;
