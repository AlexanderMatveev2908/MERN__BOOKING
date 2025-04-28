import { FC } from "react";
import StarRatingFilter from "./componentsSidebar/StarRatingFilter";
import { useSearch } from "../../../hooks/useGlobal";
import HotelTypesFilter from "./componentsSidebar/HotelTypesFilter";
import FacilitiesFilters from "./componentsSidebar/FacilitiesFilters";
import PriceFilter from "./componentsSidebar/PriceFilter/PriceFilter";

const SidebarFilters: FC = () => {
  const {
    starRating,
    handleChangeSearch,
    types,
    facilities,
    minPricePerNight,
    maxPricePerNight,
  } = useSearch();

  return (
    <div
      className={`p-5 md:pb-5 md:pt-0 rounded-2xl border-2 border-green-600 text-[whitesmoke] bg-neutral-950 xl:h-[62vh] transition-all duration-300 lg:top-[300px] lg:h-[57vh] xl:top-[260px] lg:left-0 lg:w-full md:sticky md:top-[160px] md:w-[250px] md:h-[77vh] left-0 h-fit w-full md:overflow-scroll hide_scrollbar`}
    >
      <div className="w-full grid grid-cols-1 md:gap-5 relative transition-all duration-300">
        <div className="mb-3 md:mb-0 md:sticky md:top-0 md:bg-neutral-950 md:z-20 md:w-full md:left-0 md:py-5">
          <h1 className="font-semibold text-xl ">Filter By:</h1>
        </div>

        <StarRatingFilter {...{ starRating, handleChangeSearch }} />

        <HotelTypesFilter {...{ types, handleChangeSearch }} />

        <FacilitiesFilters {...{ facilities, handleChangeSearch }} />

        <PriceFilter
          {...{
            minPriceState: minPricePerNight,
            maxPriceState: maxPricePerNight,
            handleChangeSearch,
          }}
        />

        {/* I AM THINKING ABOUT USING THE DYNAMIC COMP, FOR NOW I WILL KEEP THE HARDCODED ONE CAUSE I COULD ADD SPECIFIC STYLE IN CSS HOW I DID FOR RATING */}
        {/* <FiltersField
          {...{
            handleChangeSearch,
            filtersState: types,
            filtersConfig: hotelTypesOpt,
            title: "Hotel Types",
          }}
        />
        <FiltersField
          {...{
            handleChangeSearch,
            filtersState: facilities,
            filtersConfig: hotelFacilitiesOpt,
            title: "Hotel Facilities",
          }}
        /> */}
      </div>
    </div>
  );
};
export default SidebarFilters;
