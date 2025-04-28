import { FC } from "react";
import { SearchedHotelFetchedType } from "../../context/types/search";
import {
  fieldsArrHotel,
  fieldsArrSearch,
  priceField,
  totNightsField,
} from "./fieldsArr";
import { useMakeDynamicVar } from "./useMakeDynamicVar";
import FieldDetails from "./FieldDetails";

type searchVals = {
  checkIn: string;
  checkOut: string;
  adultCount: string;
  childCount: string;
  noNights: number;
};

type PropsType = {
  searchVals: searchVals;
  hotel: SearchedHotelFetchedType;
};

const DetailsBookingSummary: FC<PropsType> = ({ searchVals, hotel }) => {
  const dynamicVarHotel = useMakeDynamicVar(hotel);

  return (
    <div className="grid grid-cols-1 gap-y-4 w-full p-5 border-2 border-green-600 rounded-xl h-fit">
      <span className="text-xl sm:text-2xl font-bold">
        Your Booking Details
      </span>

      <div className="grid w-full grid-cols-1 gap-y-5 sm:grid-cols-2 gap-x-5">
        {fieldsArrHotel.map((field) => (
          <FieldDetails
            key={field.id}
            {...{ field, dynamicVar: dynamicVarHotel }}
          />
        ))}

        {fieldsArrSearch.map((field) => (
          <FieldDetails key={field.id} {...{ field, dynamicVar: searchVals }} />
        ))}

        <FieldDetails {...{ field: priceField, dynamicVar: dynamicVarHotel }} />

        <FieldDetails {...{ field: totNightsField, dynamicVar: searchVals }} />
      </div>
    </div>
  );
};
export default DetailsBookingSummary;
