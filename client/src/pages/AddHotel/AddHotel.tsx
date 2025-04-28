import { FC } from "react";
import HotelForm from "../../forms/HotelForm/HotelForm";
import { useAddHotel } from "./useAddHotel";

const AddHotel: FC = () => {
  const { handleSave, isLoading } = useAddHotel();

  return <HotelForm {...{ handleSave, isLoading }} />;
};
export default AddHotel;
