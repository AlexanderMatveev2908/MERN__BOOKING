import { useEffect } from "react";
import {
  HotelFetchedType,
  HotelFormDataType,
} from "../../context/types/hotels";
import { useForm } from "react-hook-form";
import { prepareFormData } from "../../utils/prepareFormData";

export const useHotelForm = (
  isLoading: boolean,
  handleSave: (formData: FormData, resetForm?: () => void) => void,
  hotel?: HotelFetchedType
) => {
  const formMethods = useForm<HotelFormDataType>({
    mode: "onChange",
  });

  const { handleSubmit, reset, setFocus } = formMethods;

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  const handleCreateHotel = handleSubmit((formDataObj: HotelFormDataType) => {
    const formData = prepareFormData(formDataObj);
    if (hotel) formData.append("hotelId", hotel._id);

    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    handleSave(formData, reset);
  });

  useEffect(() => {
    if (hotel) reset(hotel);
  }, [reset, hotel]);

  let btnTxt;
  if (isLoading) {
    if (hotel) btnTxt = "Updating hotel...";
    else btnTxt = "Creating hotel...";
  } else {
    if (hotel) btnTxt = "Update hotel";
    else btnTxt = "Create Your Hotel";
  }

  return {
    formMethods,
    handleCreateHotel,
    btnTxt,
  };
};
