import { axiosInstance } from "../../constants/instances";

export const searchHotelsAPI = async (params: URLSearchParams) => {
  const { data } = await axiosInstance.get(`/hotels/search?${params}`);
  return data;
};

export const getSingleHotelAPI = async (
  hotelId: string,
  params?: URLSearchParams
) => {
  const { data } = await axiosInstance.get(
    `/hotels/${hotelId}?${params ?? ""}`
  );
  return data;
};

export const getLatestHotelsAPI = async (limit: string) => {
  const { data } = await axiosInstance.get(
    `/hotels/latest?limit=${limit ?? ""}`
  );
  return data;
};
