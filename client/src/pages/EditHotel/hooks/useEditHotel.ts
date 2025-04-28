import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  deleteHotelAPI,
  getSingleHotelAsAdminAPI,
  updateHotelAPI,
} from "../../../context/api/hotelAPI";
import useCreateMutationHotel from "./useCreateMutationHotel";
import { MONGO_ID_REG } from "../../../constants/regex";
import { useScrollTop } from "../../../hooks/useScrollTop";

export const useEditHotel = () => {
  useScrollTop();

  const { hotelId } = useParams();
  const isValidObjectId = MONGO_ID_REG.test(hotelId!);

  const {
    data: hotelData,
    isLoading: queryLoading,
    isError,
  } = useQuery(
    ["singleHotelAdmin", hotelId],
    () => getSingleHotelAsAdminAPI(hotelId as string),
    {
      enabled: !!isValidObjectId,
    }
  );

  const { mutate: updateMutate, isLoading } = useCreateMutationHotel(
    updateHotelAPI,
    "Hotel Updated Successfully"
  );

  const handleSave = (updatedHotelForm: FormData) => {
    updateMutate(updatedHotelForm);
  };

  const { mutate: deleteMutate, isLoading: deleteLoading } =
    useCreateMutationHotel(deleteHotelAPI, "Hotel Deleted Successfully");

  const handleDeleteHotel = () => {
    deleteMutate(hotelId as string);
  };

  return {
    queryLoading,
    isError,
    isValidObjectId,
    isLoading,
    hotelData,
    handleSave,
    handleDeleteHotel,
    deleteLoading,
  };
};
