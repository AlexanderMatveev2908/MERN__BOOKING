import { FC } from "react";
import SpinnerDot from "../../components/SpinnerDot/SpinnerDot";
import SidebarFilters from "./SidebarFilters/SidebarFilters";
import SearchHotelsItem from "./SearchHotelsItem";
import HotelSorters from "./HotelSorters/HotelSorters";
import { SearchedHotelFetchedType } from "../../context/types/search";
import { useSearchHotels } from "./hooks/useSearchHotels";
import BlockPages from "../../components/BlockPages/BlockPages";

const SearchHotels: FC = () => {
  const {
    searchVals,
    searchedLoading,
    hotels,
    totHotels,
    currPage,
    setCurrPage,
    totalPages,
  } = useSearchHotels();

  return (
    <div className="w-full relative overflow-visible">
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10 sm:gap-5 mb-[100px] items-start">
        <HotelSorters {...{ destination: searchVals.destination, totHotels }} />

        <SidebarFilters />

        {searchedLoading ? (
          <SpinnerDot />
        ) : (
          <>
            <div className="flex flex-col gap-5">
              {totHotels ? (
                hotels.map((hotel: SearchedHotelFetchedType) => (
                  <SearchHotelsItem key={hotel._id} {...{ hotel }} />
                ))
              ) : (
                <div className="px-5 w-full justify-center flex mt-[25px] md:mt-[100px]">
                  <h1 className="text-3xl font-semibold ">
                    It seems that are not hotels with these criteria 🤔
                  </h1>
                </div>
              )}
            </div>

            {!!totHotels && (
              <BlockPages {...{ currPage, setCurrPage, totalPages }} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default SearchHotels;
