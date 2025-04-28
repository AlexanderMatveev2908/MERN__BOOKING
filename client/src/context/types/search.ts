import { FormEvent } from "react";
import {
  CLEAR_SEARCH_VALS,
  SAVE_SEARCH,
  SET_VAL_SEARCH,
} from "../actions/searchActions";
import { ImageType } from "./hotels";
import { BookingFetchedType } from "./bookings";

export type SearchStateType = {
  destination: string;
  checkIn: any;
  checkOut: any;
  adultCount: string;
  childCount: string;
  hotelId: string;
  facilities: string[];
  types: string[];
  starRating: string[];
  minPricePerNight: string;
  maxPricePerNight: string;
  sorterStars: string;
  sorterPrice: string;
};

export type SearchedHotelFetchedType = {
  _id: string;
  userId: string;
  isAdmin: boolean;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  availableAdults: number;
  availableChildren: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  images: ImageType[];
  bookings: BookingFetchedType[];
  createdAt: Date;
  lastUpdated: Date;
};

export type SearchVals = SearchStateType & {
  saveSearchVals: () => void;
  handleChangeSearch: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeSearchDate: (date: Date | null, field: string) => void;
  handleChangeSorter: (e: React.MouseEvent<HTMLElement>) => void;
  handleSubmitSearch: (e: FormEvent) => void;
  clearSearchVals: () => void;
};

export type SearchActionsType =
  | {
      type: typeof SAVE_SEARCH;
      payload: Omit<SearchStateType, "hotelId"> & { hotelId?: string };
    }
  | {
      type: typeof SET_VAL_SEARCH;
      payload: {
        field: string;
        val: SearchStateType[keyof SearchStateType];
      };
    }
  | {
      type: typeof CLEAR_SEARCH_VALS;
    };
