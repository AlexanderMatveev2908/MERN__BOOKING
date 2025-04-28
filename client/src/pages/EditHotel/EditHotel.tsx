import { Navigate } from "react-router-dom";

import HotelForm from "../../forms/HotelForm/HotelForm";
import SpinnerDot from "../../components/SpinnerDot/SpinnerDot";
import { useEditHotel } from "./hooks/useEditHotel";
import NonExistingHotel from "../../components/NonExistingHotel/NonExistingHotel";
const EditHotel = () => {
  const {
    queryLoading,
    isError,
    isValidObjectId,
    isLoading,
    hotelData,
    handleSave,
    handleDeleteHotel,
    deleteLoading,
  } = useEditHotel();

  return queryLoading ? (
    <SpinnerDot />
  ) : isError ? (
    <NonExistingHotel {...{ path: "/admin/my-hotels" }} />
  ) : !isValidObjectId ? (
    <Navigate to="/some-non-existing-page" replace={true} />
  ) : (
    <HotelForm
      {...{
        isLoading,
        hotel: hotelData?.hotel,
        handleSave,
        handleDeleteHotel,
        deleteLoading,
      }}
    />
  );
};
export default EditHotel;
