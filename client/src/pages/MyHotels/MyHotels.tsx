import { Link } from "react-router-dom";
import SpinnerDot from "../../components/SpinnerDot/SpinnerDot";
import { HotelFetchedType } from "../../context/types/hotels";
import MyHotelsItem from "./MyHotelsItem/MyHotelsItem";
import { useMyHotels } from "./useMyHotels";
import BlockPages from "../../components/BlockPages/BlockPages";

const MyHotels = () => {
  const { isLoading, hotels, totalPages, currPage, setCurrPage } =
    useMyHotels();

  return (
    <div className="flex flex-col items-center relative">
      <div className="flex flex-col gap-10 mb-[100px]">
        <span className="my_hotels_span grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">
          <h1 className="text-3xl font-bold">My Hotels</h1>

          <Link to="/admin/add-hotel" className="my_hotels__btn btn">
            Add Hotel
          </Link>
        </span>

        {isLoading ? (
          <SpinnerDot />
        ) : !hotels?.length ? (
          <div className="flex w-full justify-center">
            <h1 className="text-2xl font-bold">No hotels available 😴</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {hotels?.map((hotel: HotelFetchedType) => (
              <MyHotelsItem key={hotel._id} {...{ hotel }} />
            ))}
          </div>
        )}
      </div>

      <BlockPages {...{ totalPages, currPage, setCurrPage }} />
    </div>
  );
};
export default MyHotels;
