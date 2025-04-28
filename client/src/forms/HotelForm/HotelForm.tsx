import { FC, useState } from "react";
import { FormProvider } from "react-hook-form";
import { HotelFetchedType } from "../../context/types/hotels";
import DetailsSection from "./DetailsSection/DetailsSection";
import HotelTypeSection from "./HotelTypeSection/HotelTypeField";
import FacilitiesSection from "./FacilitiesSection/FacilitiesSection";
import GuestsSection from "./GuestsSection/GuestsSection";
import ImagesSection from "./ImagesSection/ImagesSection";
import PopupDeleteHotel from "./PopupDeleteHotel/PopupDeleteHotel";
import { useHotelForm } from "./useHotelForm";

type PropsType = {
  handleSave: (formData: FormData, resetForm?: () => void) => void;
  isLoading: boolean;
  hotel?: HotelFetchedType;
  handleDeleteHotel?: () => void;
  deleteLoading?: boolean;
};

const HotelForm: FC<PropsType> = ({
  handleSave,
  isLoading,
  hotel,
  handleDeleteHotel,
  deleteLoading,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);

  const { formMethods, handleCreateHotel, btnTxt } = useHotelForm(
    isLoading,
    handleSave,
    hotel
  );

  const title = hotel ? "Edit Hotel" : "Add Hotel";
  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleCreateHotel}
        className="w-[90%] sm:w-[85%] md:w-[75%] mx-auto flex flex-col gap-5"
      >
        {hotel && popupOpen && (
          <PopupDeleteHotel
            {...{ setPopupOpen, handleDeleteHotel, deleteLoading }}
          />
        )}

        <DetailsSection {...{ title, hotel, setPopupOpen }} />

        <HotelTypeSection />

        <FacilitiesSection />

        <GuestsSection />

        <ImagesSection {...{ hotel, isLoading }} />

        <div className="flex justify-center">
          <button
            disabled={isLoading}
            type="submit"
            className="border-2 border-green-600 text-[whitesmoke] font-bold rounded-full px-5 py-1 hover:bg-green-600 hover:text-neutral-950 hover:border-neutral-950 transition-all duration-300 min-w-[250px] sm:min-w-[300px] text-lg disabled:opacity-50 disabled:cursor-wait"
          >
            {btnTxt}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
export default HotelForm;
