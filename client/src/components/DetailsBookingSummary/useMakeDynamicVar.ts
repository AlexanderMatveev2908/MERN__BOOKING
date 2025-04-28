import { SearchedHotelFetchedType } from "../../context/types/search";
import { priceFormatter } from "../../utils/priceFormatter";

export const useMakeDynamicVar = (hotel: SearchedHotelFetchedType) => ({
  pricePerNight: priceFormatter(hotel.pricePerNight),
  country: hotel.country,
  city: hotel.city,
  name: hotel.name,
});
