import { AxiosResponse } from "axios";
import { axiosInstance } from "../../constants/instances";

export const createHotelAPI = async (
  formData: FormData
): Promise<AxiosResponse> => {
  const { data } = await axiosInstance.post("/admin-hotels", formData);
  return data;
};

export const getHotelsAsAdminAPI = async (page: number): Promise<any> => {
  const { data } = await axiosInstance.get(
    `/admin-hotels?page=${page}&limit=5&sort=desc`
  );
  return data;
};

// const { data: { hotel = {} } = {} } interesting way but i ll write it simpler

export const getSingleHotelAsAdminAPI = async (id: string): Promise<any> => {
  const { data } = await axiosInstance.get(`/admin-hotels/${id}`);
  return data;
};

export const updateHotelAPI = async (
  updatedHotelForm: FormData
): Promise<any> => {
  const { data } = await axiosInstance.put(
    `admin-hotels/${updatedHotelForm.get("hotelId")}`,
    updatedHotelForm
  );
  return data;
};

export const deleteHotelAPI = async (id: string) => {
  const { data } = await axiosInstance.delete(`/admin-hotels/${id}`);
  return data;
};
