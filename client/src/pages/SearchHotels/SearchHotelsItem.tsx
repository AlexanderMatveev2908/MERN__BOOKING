import { FC } from "react";
import { AiFillStar } from "react-icons/ai";
import useTruncateLength from "../../hooks/useTruncateLength";
import { truncateText } from "../../utils/truncateText";
import Facilities from "../../components/Facilities/Facilities";
import { priceFormatter } from "../../utils/priceFormatter";
import { Link } from "react-router-dom";
import AvailableGuests from "../../components/AvailableGuests/AvailableGuests";
import { SearchedHotelFetchedType } from "../../context/types/search";
import { MdAdminPanelSettings } from "react-icons/md";

type PropsType = {
  hotel: SearchedHotelFetchedType;
};

const SearchHotelsItem: FC<PropsType> = ({ hotel }) => {
  const maxTxt = useTruncateLength();

  return (
    <div className="grid grid-cols-1 gap-4 lg:gap-8 lg:grid-cols-[1fr_2fr] border-2 border-green-600 p-5 rounded-xl col-span-2 md:col-span-1 md:col-start-2">
      <div className="hide_scrollbar overflow-x-auto flex gap-5 w-full p-5 border-2 rounded-lg border-green-600 snap-x snap-mandatory max-h-fit">
        {hotel.images.map((image) => (
          <img
            key={image.public_id}
            src={image.url}
            alt=""
            className="object-cover h-[100px] min-w-[150px] sm:min-w-[200px] rounded-lg snap-center"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-full">
        <div className="w-full grid grid-cols-1 gap-5 items-center sm:grid-cols-2">
          <div className=" w-full flex gap-5">
            <span className="flex gap-1">
              {Array.from({ length: hotel.starRating }).map((_, i) => (
                <AiFillStar key={i} size={20} className="text-[whitesmoke]" />
              ))}
            </span>

            <span className="font-semibold">{hotel.type}</span>
          </div>

          {hotel.isAdmin && (
            <Link
              className="group font-semibold border-2 border-green-600 px-5 py-1 rounded-xl gap-3 items-center flex justify-between w-full max-w-[250px] justify-self-end"
              to={`/admin/edit-hotel/${hotel._id}`}
            >
              <span className="[whitesmoke] transition-all duration-300 group-hover:text-green-600">
                View as admin
              </span>

              <MdAdminPanelSettings className="[whitesmoke] transition-all duration-300 group-hover:text-green-600 h-[25px] w-[25px] shrink-0" />
            </Link>
          )}
        </div>

        <Link
          to={`/hotel-details/${hotel._id}`}
          className="text-base sm:text-lg cursor-pointer break-all font-bold"
        >
          {truncateText(hotel.name, maxTxt / 4)}
        </Link>

        <div className="max-w-full">
          <p className="break-all text-sm">
            {truncateText(hotel.description, maxTxt)}
          </p>
        </div>

        <AvailableGuests {...{ hotel }} />

        <Facilities {...{ facilities: hotel.facilities }} />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
          <span className="justify-self-start self-center">
            {priceFormatter(hotel.pricePerNight)}&nbsp;Per Night
          </span>

          <Link
            className="justify-self-center min-w-[200px] w-full max-w-[250px]"
            to={`/hotel-details/${hotel._id}`}
          >
            <button className="pseudo_btn search_hotels__btn max-w-[300px]">
              <span className="z-20 relative font-semibold sm:text-lg">
                View Details
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SearchHotelsItem;
