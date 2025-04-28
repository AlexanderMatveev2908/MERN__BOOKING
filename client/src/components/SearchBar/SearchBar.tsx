import { FC } from "react";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  maxDate,
  minDate,
  searchFieldADatesArr,
  searchFieldAGuestsArr,
} from "./fieldsArr";
import { useSearch } from "../../hooks/useGlobal";
import { useSearchBar } from "./hooks/useSearchBar";

const SearchBar: FC = () => {
  const {
    destination,
    checkIn,
    checkOut,
    adultCount,
    childCount,
    // hotelId,
    handleChangeSearch,
    handleChangeSearchDate,
    handleSubmitSearch,
    clearSearchVals,
  } = useSearch();

  const {
    searchRef,
    placeholderDest,
    dynamicValGuests,
    dynamicValDates,
    isFetchingUserHotels,
  } = useSearchBar(adultCount, childCount, checkIn, checkOut);

  return (
    <div
      id="searchBar"
      onSubmit={handleSubmitSearch}
      className="w-full md:w-[80%] mx-auto  lg:sticky lg:top-[160px] lg:z-40 pl-[70px] md:px-0"
    >
      <form className="w-full p-5 bg-neutral-950 border-[3px] border-green-600 -mt-4 sm:-mt-8 rounded-2xl text-[whitesmoke] grid grid-cols-1 lg:grid-cols-2 gap-2 align-middle relative">
        <div className="grid grid-cols-[90px_1fr] place-content-center">
          <MdTravelExplore
            size={25}
            className="text-[whitesmoke] justify-self-start sm:justify-self-center self-center"
          />
          <input
            type="text"
            ref={searchRef}
            className="bg-transparent px-5 py-1 rounded-full border-2 border-green-600 focus_input outline-none w-full"
            placeholder={placeholderDest}
            value={destination}
            name="destination"
            onChange={handleChangeSearch}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-full place-content-center gap-2">
          {searchFieldAGuestsArr.map((field) => (
            <label
              key={field.id}
              className="grid grid-cols-[90px_1fr] place-content-center items-center"
            >
              <span className="font-bold">{field.label}</span>
              <input
                type="number"
                min={field.min}
                value={dynamicValGuests[field.name]}
                className="bg-transparent border-2 border-green-600  outline-none focus_input px-5 py-1 rounded-full w-full"
                name={field.name}
                onChange={handleChangeSearch}
              />
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-full lg:col-span-2 xl:col-span-1 place-content-center gap-2">
          {searchFieldADatesArr.map((field) => (
            <div
              key={field.id}
              className="grid grid-cols-[90px_1fr] place-content-center items-center"
            >
              <span className="font-bold">{field.label}</span>
              <DatePicker
                selected={dynamicValDates[field.name]}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Check-in Date"
                className="px-5 py-1 bg-transparent text-[whitesmoke] outline-none focus_input w-full rounded-full border-2 border-green-600"
                name={field.name}
                onChange={(date) => handleChangeSearchDate(date, field.name)}
                dateFormat="dd/MM/yyyy"
                popperPlacement="bottom-start"
              />
            </div>
          ))}
        </div>

        <div className="w-full grid grid-cols-5 gap-2 sm:gap-5 lg:col-span-2 xl:col-span-1">
          <button
            type="submit"
            disabled={!!isFetchingUserHotels}
            className="search_bar__btn  border-green-600 hover:bg-green-600 col-span-3 max-w-[400px]"
          >
            {isFetchingUserHotels ? "Searching" : "Search"}
          </button>
          <button
            type="button"
            onClick={clearSearchVals}
            disabled={!!isFetchingUserHotels}
            className="search_bar__btn border-red-600 hover:bg-red-600 col-span-2 max-w-[200px]"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};
export default SearchBar;
