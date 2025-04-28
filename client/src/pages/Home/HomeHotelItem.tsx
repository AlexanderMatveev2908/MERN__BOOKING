import { FC } from "react";
import { fieldsArrLeft } from "./fieldsArr";
import { priceFormatter } from "../../utils/priceFormatter";
import { Link } from "react-router-dom";

type PropsType = {
  hotel: any;
};

const HomeHotelItem: FC<PropsType> = ({ hotel }) => {
  return (
    <Link
      to={`/hotel-details/${hotel._id}`}
      className="w-full max-w-full h-full flex flex-col items-center group relative cursor-pointer"
    >
      <div className="w-full h-full transition-all duration-500 relative">
        <img
          src={hotel.images[0].url}
          alt=""
          className="w-full h-full min-h-[250px]  object-cover rounded-xl"
        />

        <div className="absolute inset-0 flex items-start flex-col gap-y-3 bg-black/50 opacity-0 transition-all duration-500 hover:opacity-100 px-5">
          {fieldsArrLeft.map((field: any) => (
            <div
              key={field.id}
              className="text-lg sm:text-xl text-[whitesmoke] font-bold truncate max-w-full grid grid-cols-[30px_1fr] first:pt-5"
            >
              <field.icon className="h-[25px] w-[25px]" />
              <span className="truncate">
                {field.field === "pricePerNight"
                  ? priceFormatter(hotel[field.field])
                  : hotel[field.field]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};
export default HomeHotelItem;
