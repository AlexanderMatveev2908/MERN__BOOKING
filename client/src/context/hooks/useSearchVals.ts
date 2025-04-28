/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, FormEvent } from "react";
import {
  CLEAR_SEARCH_VALS,
  SAVE_SEARCH,
  SET_VAL_SEARCH,
} from "../actions/searchActions";
import {
  SearchActionsType,
  SearchStateType,
  SearchVals,
} from "../types/search";
import { NavigateFunction } from "react-router-dom";
import { useQueryClient } from "react-query";
import {
  REG_DATE,
  REG_GUESTS,
  REG_PRICE_MANDATORY,
  REG_SEARCH,
} from "../../constants/regex";
import { formatDate, formatDateForUTC } from "../../utils/formatDate";

export const useSearchVals = (
  searchState: SearchStateType,
  dispatch: Dispatch<SearchActionsType>,
  navigate: NavigateFunction
): SearchVals => {
  const queryClient = useQueryClient();

  const handleChangeSearch = (e?: React.ChangeEvent<HTMLInputElement>) => {
    const { name: field = "", value: val = "" } = e?.target ?? {};

    console.log(val);

    if (field === "destination" && !REG_SEARCH.test(val)) return;
    if (
      (field === "adultCount" || field === "childCount") &&
      !REG_GUESTS.test(val)
    )
      return "";
    if (
      (field === "minPricePerNight" || field === "maxPricePerNight") &&
      !REG_PRICE_MANDATORY.test(val)
    )
      return "";

    dispatch({ type: SET_VAL_SEARCH, payload: { field, val } });
  };

  const handleChangeSearchDate = (date: Date | null, field: string) => {
    if (!date || !REG_DATE.test(formatDate(date)) || !(date instanceof Date))
      return;

    dispatch({
      type: SET_VAL_SEARCH,
      payload: { field, val: formatDateForUTC(date) },
    });
  };

  const handleChangeSorter = (e: React.MouseEvent<HTMLElement>) => {
    const field = e.currentTarget.dataset.field as string;
    const val = e.currentTarget.dataset.val;

    dispatch({ type: SET_VAL_SEARCH, payload: { field, val } });
  };

  const saveSearchVals = () => {
    const {
      facilities,
      types,
      starRating,
      minPricePerNight,
      maxPricePerNight,
      ...valsToSaveStorage
    } = searchState;

    console.log(searchState.adultCount);

    sessionStorage.setItem(
      "searchState",
      JSON.stringify(valsToSaveStorage, (key, val) =>
        val instanceof Date
          ? val.toISOString()
          : key === "adultCount" && !val
          ? "1"
          : key === "childCount" && !val
          ? "0"
          : val
      )
    );
    dispatch({ type: SAVE_SEARCH, payload: searchState });
    // for (const pair of Object.entries(searchState)) {
    //   console.log(pair[0] + ":", pair[1] + "=>", typeof pair[1]);
    // }
  };

  const clearSearchVals = () => {
    sessionStorage.removeItem("searchState");
    dispatch({ type: CLEAR_SEARCH_VALS });
  };

  const handleSubmitSearch = async (e: FormEvent) => {
    e.preventDefault();

    saveSearchVals();
    await queryClient.invalidateQueries("searchHotels");
    navigate("/search");
  };

  return {
    saveSearchVals,
    handleChangeSearch,
    handleChangeSearchDate,
    handleChangeSorter,
    handleSubmitSearch,
    clearSearchVals,
    ...searchState,
  };
};
