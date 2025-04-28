import { BiHotel, BiMoney } from "react-icons/bi";
import { BsBuilding, BsMap, BsStar } from "react-icons/bs";
import { priceFormatter } from "../../../utils/priceFormatter";
import { truncateText } from "../../../utils/truncateText";
import { Link } from "react-router-dom";
import useTruncateLength from "../../../hooks/useTruncateLength";
import { HotelFetchedType } from "../../../context/types/hotels";
import { FC } from "react";
import Facilities from "../../../components/Facilities/Facilities";

type PropsType = {
  hotel: HotelFetchedType;
};

const MyHotelsItem: FC<PropsType> = ({ hotel }) => {
  const maxTxtLength = useTruncateLength();

  return (
    <div
      key={hotel._id}
      className="flex flex-col justify-between border-2 border-green-600 rounded-xl p-8 gap-5"
    >
      {/* NAME */}
      <h2 className="text-2xl font-bold truncate">{hotel.name}</h2>

      {/* IMAGES */}
      <div className="hide_scrollbar overflow-x-auto flex gap-5 w-full p-5 border-2 rounded-lg border-green-600 snap-x snap-mandatory">
        {hotel.images.map((image) => (
          <img
            key={image.public_id}
            src={image.url}
            alt=""
            className="object-cover h-[100px] min-w-[150px] sm:min-w-[200px] rounded-lg snap-center"
          />
        ))}
      </div>

      {/* DESCRIPTION */}
      <div className="break-words px-5 py-3 border-2 border-green-600 text-sm rounded-2xl">
        {truncateText(hotel.description, maxTxtLength)}
      </div>

      {/* CITY & COUNTRY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        <div className="my_hotels__item">
          <BsMap />
          <span className="truncate">
            {hotel.city},&nbsp;{hotel.country}
          </span>
        </div>

        {/* TYPE */}
        <div className="my_hotels__item">
          <BsBuilding />
          {hotel.type}
        </div>

        {/* PRICE */}
        <div className="my_hotels__item">
          <BiMoney />
          {priceFormatter(hotel.pricePerNight)} per night
        </div>

        {/* COUNTS  GUESTS*/}
        <div className="my_hotels__item">
          <BiHotel />
          <span className="flex flex-wrap">
            <span className="whitespace-nowrap">
              {hotel.adultCount}&nbsp;adults
            </span>
            ,&nbsp;
            <span className="whitespace-nowrap">
              {hotel.childCount}&nbsp;children
            </span>
          </span>
        </div>

        {/* RATING */}
        <div className="my_hotels__item">
          {Array.from({ length: hotel.starRating }, (_, i) => (
            <BsStar className="" key={i} />
          ))}
          &nbsp;Rating
        </div>

        {/* FACILITIES */}
        <Facilities {...{ facilities: hotel?.facilities }} />
      </div>

      {/* BUTTON EDIT */}
      <span className="flex justify-end">
        <Link
          className="btn hover:-rotate-6 hover:-translate-y-2 hover:translate-x-1"
          to={`/admin/edit-hotel/${hotel._id}`}
        >
          Edit Hotel
        </Link>
      </span>
    </div>
  );
};
export default MyHotelsItem;
