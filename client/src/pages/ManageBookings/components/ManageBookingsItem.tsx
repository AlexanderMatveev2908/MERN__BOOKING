import { FC } from "react";
import { BookingFetchedType } from "../../../context/types/bookings";
import FieldItem from "./FieldItem";
import {
  fieldsArrLeftBookDetails,
  fieldsArrLeftUser,
  fieldsArrRightBookCalcMoney,
  nameHotel,
} from "./fieldsArr";

type PropsType = {
  booking: BookingFetchedType;
};

const ManageBookingsItem: FC<PropsType> = ({ booking }) => {
  return (
    <div className="w-full grid grid-cols-1 border-2 border-green-600 rounded-xl p-5 sm:grid-cols-2 gap-5 h-full">
      <div className="w-full gap-y-5 grid grid-cols-1">
        <img
          src={booking.hotel.images[0].url}
          alt=""
          className="w-full max-w-[200px] h-full max-h-fit rounded-xl object-cover justify-self-center"
        />

        {(() => {
          const content = [];

          for (let i = 0; i < fieldsArrLeftUser.length; i++) {
            const curr = fieldsArrLeftUser[i];
            const next = fieldsArrLeftUser[i + 1];

            if (
              curr &&
              next &&
              !["email"].includes(curr.field) &&
              !["email"].includes(next.field)
            ) {
              content.push(
                <div key={curr.id} className="w-full flex flex-col gap-y-3">
                  <FieldItem
                    {...{
                      dynamicVar: booking.user,
                      field: curr,
                    }}
                  />
                  <FieldItem
                    {...{
                      dynamicVar: booking.user,
                      field: next,
                    }}
                  />
                </div>
              );
              i++;
            } else {
              content.push(
                <FieldItem
                  key={curr.id}
                  {...{
                    dynamicVar: booking.user,
                    field: curr,
                  }}
                />
              );
            }
          }
          return content;
        })()}

        {fieldsArrLeftBookDetails.map((field) => (
          <FieldItem key={field.id} {...{ dynamicVar: booking, field }} />
        ))}
      </div>
      <div className="w-full gap-y-3 grid grid-cols-1 h-fit">
        <FieldItem {...{ field: nameHotel, dynamicVar: booking.hotel }} />

        {fieldsArrRightBookCalcMoney.map((field) => (
          <FieldItem key={field.id} {...{ dynamicVar: booking, field }} />
        ))}
      </div>
    </div>
  );
};
export default ManageBookingsItem;
