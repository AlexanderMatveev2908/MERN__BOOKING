import { formatDateForUTC } from "../../../utils/formatDate";
import { SAVE_SEARCH, SET_VAL_SEARCH } from "../../actions/searchActions";
import { searchInitState } from "../../initStates/searchInitState";
import { SearchActionsType, SearchStateType } from "../../types/search";

export const setValsSearchHandler = (
  searchState: SearchStateType,
  action: Extract<SearchActionsType, { type: typeof SET_VAL_SEARCH }>
) => {
  const { field, val } = action.payload as {
    field: keyof SearchStateType;
    val: SearchStateType[keyof SearchStateType];
  };

  if (!field || typeof val === "undefined") return searchState;

  if (
    field === "checkIn" &&
    formatDateForUTC(searchState.checkOut).getTime() <=
      formatDateForUTC(val).getTime()
  )
    return {
      ...searchState,
      [field]: val,
      checkOut: new Date(new Date().setDate(val.getDate() + 1)),
    };

  if (
    field === "checkOut" &&
    formatDateForUTC(searchState.checkIn).getTime() >=
      formatDateForUTC(val).getTime()
  )
    return {
      ...searchState,
      [field]: new Date(new Date().setDate(searchState.checkIn.getDate() + 1)),
    };

  if (Array.isArray(searchState[field]))
    return {
      ...searchState,
      [field]: searchState[field].includes(val)
        ? searchState[field].filter((el: string | number) => el !== val)
        : [...searchState[field], val],
    };

  if (
    (field === "sorterPrice" && searchState.sorterPrice === val) ||
    (field === "sorterStars" && searchState.sorterStars === val)
  )
    return {
      ...searchState,
      [field]: "",
    };

  return {
    ...searchState,
    [field]: val,
  };
};

export const saveSearchHandler = (
  action: Extract<SearchActionsType, { type: typeof SAVE_SEARCH }>
) => {
  const { adultCount, childCount, ...vals } = action.payload as any;

  return {
    ...vals,
    adultCount: adultCount ? adultCount : "1",
    childCount: childCount ? childCount : "0",
  };
};

export const clearSearchValsHandler = () => {
  return {
    destination: "",
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
    adultCount: "1",
    childCount: "0",
    hotelId: "",
    facilities: searchInitState.facilities,
    types: searchInitState.types,
    starRating: searchInitState.starRating,
    minPricePerNight: searchInitState.minPricePerNight,
    maxPricePerNight: searchInitState.maxPricePerNight,
    sorterStars: "",
    sorterPrice: "",
  };
};
