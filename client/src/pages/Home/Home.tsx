import { FC } from "react";
import { useHome } from "./useHome";
import SpinnerDot from "../../components/SpinnerDot/SpinnerDot";
import HomeHotelItem from "./HomeHotelItem";
import { SearchedHotelFetchedType } from "../../context/types/search";

const Home: FC = () => {
  const { hotels, isLoadingHotels } = useHome();

  return isLoadingHotels ? (
    <SpinnerDot />
  ) : (
    <div className="grid grid-cols-1 w-full place-content-center justify-items-center gap-y-5 relative pb-[100px]">
      <h1 className="text-2xl sm::text-3xl font-bold">LATEST HOTELS</h1>

      {!!hotels?.length && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-[80%] sm:w-[90%] md:w-full max-w-full justify-items-center">
          {hotels.map((hotel: SearchedHotelFetchedType) => (
            <HomeHotelItem key={hotel._id} {...{ hotel }} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Home;
