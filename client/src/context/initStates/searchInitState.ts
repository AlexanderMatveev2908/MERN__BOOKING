import { tomorrow } from "../../utils/formatDate";
import { SearchStateType } from "../types/search";

const storedSearchState = sessionStorage.getItem("searchState")
  ? JSON.parse(sessionStorage.getItem("searchState")!)
  : null;

export const searchInitState: SearchStateType = {
  destination: storedSearchState?.destination ?? "",
  checkIn: storedSearchState?.checkIn
    ? new Date(storedSearchState.checkIn)
    : new Date(),
  checkOut: storedSearchState?.checkOut
    ? new Date(storedSearchState.checkOut)
    : tomorrow,
  adultCount: storedSearchState?.adultCount || "1",
  childCount: storedSearchState?.childCount || "0",
  hotelId: storedSearchState?.hotelId ?? "",
  facilities: [],
  types: [],
  starRating: [],
  minPricePerNight: "",
  maxPricePerNight: "",
  sorterPrice: storedSearchState?.sorterPrice ?? "",
  sorterStars: storedSearchState?.sorterStars ?? "",
};
