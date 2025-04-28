import { SearchedHotelFetchedType } from "../../context/types/search";

export const makeStyleGuests = ({
  hotel,
}: {
  hotel: SearchedHotelFetchedType;
}) => {
  const availabilityAdultsPerc =
    hotel.adultCount > 0
      ? Math.round((hotel.availableAdults / hotel.adultCount) * 100)
      : 0;
  const availabilityChildPerc =
    hotel.availableChildren > 0
      ? Math.round((hotel.availableChildren / hotel.childCount) * 100)
      : 0;

  const colors = [availabilityAdultsPerc, availabilityChildPerc].map((perc) =>
    perc >= 75
      ? "border-blue-600 text-blue-600"
      : perc >= 50
      ? "border-green-600 text-green-600"
      : perc >= 25
      ? "border-yellow-600 text-yellow-600"
      : perc > 0
      ? "border-orange-600 text-orange-600"
      : "border-red-600 text-red-600"
  );

  const numIcons = [availabilityAdultsPerc, availabilityChildPerc].map((perc) =>
    perc >= 75 ? 5 : perc >= 50 ? 4 : perc >= 25 ? 3 : perc > 0 ? 2 : 1
  );

  return { colors, numIcons };
};
