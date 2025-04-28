import { FC } from "react";
import { Link, Navigate } from "react-router-dom";
import SpinnerDot from "../../components/SpinnerDot/SpinnerDot";
import { useHotelPage } from "./useHotelPage";
import NonExistingHotel from "../../components/NonExistingHotel/NonExistingHotel";
import { ImageType } from "../../context/types/hotels";
import { FaStar } from "react-icons/fa";
import FacilitiesHotel from "./FacilitiesHotel/FacilitiesHotel";
import GuestForm from "../../forms/GuestForm/GuestForm";
import { MdAdminPanelSettings } from "react-icons/md";

const HotelPage: FC = () => {
  const { isLoadingHotel, isErrorHotel, isValidObjectId, hotel } =
    useHotelPage();

  return isLoadingHotel ? (
    <SpinnerDot />
  ) : isErrorHotel ? (
    <NonExistingHotel {...{ path: "/search" }} />
  ) : !isValidObjectId ? (
    <Navigate to="/some-non-existing-page" replace={true} />
  ) : (
    <div className="grid grid-cols-1 w-full gap-5 sm:gap-8 justify-items-center">
      <div className="flex w-[80%] sm:w-[90%] md:w-full gap-3">
        {Array.from({ length: hotel?.starRating })?.map((_, i) => (
          <FaStar
            key={i}
            className="h-[20px] w-[20px] md:w-[25px] md:h-[25px]"
          />
        ))}
      </div>

      <div className="flex w-[80%] sm:w-[90%] md:w-full flex-col gap-y-3">
        <span className="text-2xl sm:text-3xl font-bold break-words max-w-full">
          {hotel.name}
        </span>
      </div>

      {hotel.isAdmin && (
        <Link
          className="text-lg sm:text-xl group font-semibold border-2 border-green-600 px-5 py-1 rounded-xl gap-3 items-center justify-between max-w-[250px] flex w-[80%] sm:w-[90%] md:w-full justify-self-end mr-5"
          to={`/admin/edit-hotel/${hotel._id}`}
        >
          <span className="[whitesmoke] transition-all duration-300 group-hover:text-green-600">
            View as admin
          </span>

          <MdAdminPanelSettings className="[whitesmoke] transition-all duration-300 group-hover:text-green-600 h-[25px] w-[25px] shrink-0" />
        </Link>
      )}

      <div className="hide_scrollbar overflow-x-auto flex gap-5 w-[80%] sm:w-[90%] md:w-full p-5 border-2 rounded-lg border-green-600 snap-x snap-mandatory max-h-fit">
        {hotel.images.map((image: ImageType) => (
          <img
            key={image.public_id}
            src={image.url}
            alt={hotel.name}
            className="object-cover w-full h-[100px] min-w-[150px] sm:h-[150px] sm:min-w-[200px] rounded-lg snap-center md:min-w-[300px] md:h-[200px]"
          />
        ))}
      </div>

      <FacilitiesHotel {...{ hotel }} />

      <div className="w-[80%] sm:w-[90%] md:w-full flex flex-col gap-3">
        <span className="text-lg sm:text-xl font-semibold">Description</span>

        <div className="border-2 border-green-600 rounded-xl p-5 break-words max-h-[300px] overflow-y-scroll hide_scrollbar">
          {hotel.description}
        </div>
      </div>

      <div className="w-[80%] sm:w-[90%] md:w-full grid grid-cols-1 gap-y-5 sm:grid-cols-2 gap-x-5">
        <span className="text-lg sm:text-xl font-semibold sm:col-span-2">
          Location
        </span>

        <span className="text-lg sm:text-xl font-semibold border-2 border-green-600 rounded-xl p-5 break-words max-h-[300px] overflow-y-scroll hide_scrollbar">
          Country: {hotel.country}
        </span>

        <span className="text-lg sm:text-xl font-semibold border-2 border-green-600 rounded-xl p-5 break-words max-h-[300px] overflow-y-scroll hide_scrollbar">
          City: {hotel.city}
        </span>
      </div>

      <GuestForm {...{ hotel }} />
    </div>
  );
};
export default HotelPage;
