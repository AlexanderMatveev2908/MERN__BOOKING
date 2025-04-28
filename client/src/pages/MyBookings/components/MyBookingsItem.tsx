import { FC } from "react";
import { BookingFetchedType } from "../../../context/types/bookings";
import { fieldsArrLeft, fieldsArrRight } from "./fieldsArr";
import FieldLeft from "./FieldBooking";
import FieldRight from "./FieldRight";

type PropsType = {
  booking: BookingFetchedType;
  setPopup: (popup: boolean) => void;
  setBookingIdRefundId: (bookingId: string) => void;
};

const MyBookingsItem: FC<PropsType> = ({
  booking,
  setPopup,
  setBookingIdRefundId,
}) => {
  return (
    <div className="w-full grid grid-cols-1 border-2 border-green-600 rounded-xl p-5 sm:grid-cols-2 gap-5 h-full">
      <div className="w-full flex flex-col items-center gap-y-5">
        <img
          src={booking.hotel.images[0].url}
          alt=""
          className="w-full max-w-[350px] h-full max-h-fit rounded-xl object-cover"
        />

        <div className="w-full flex flex-col gap-5">
          {fieldsArrLeft.map((field) => (
            <FieldLeft
              key={field.id}
              {...{ dynamicVar: booking.hotel, field }}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-y-5">
        {(() => {
          const content = [];

          for (let i = 0; i < fieldsArrRight.length; i++) {
            const currField = fieldsArrRight[i]?.field;
            const nextField = fieldsArrRight[i + 1]?.field;

            if (
              currField &&
              nextField &&
              ["adultCount", "childCount"].includes(currField) &&
              ["adultCount", "childCount"].includes(nextField)
            ) {
              content.push(
                <div
                  key={fieldsArrRight[i].id}
                  className="flex w-full flex-col gap-5 sm:flex-row"
                >
                  <FieldRight
                    {...{ dynamicVar: booking, field: fieldsArrRight[i] }}
                  />
                  <FieldRight
                    {...{ dynamicVar: booking, field: fieldsArrRight[i + 1] }}
                  />
                </div>
              );
              i++;
            } else {
              content.push(
                <FieldRight
                  key={fieldsArrRight[i].id}
                  {...{ dynamicVar: booking, field: fieldsArrRight[i] }}
                />
              );
            }
          }
          return content;
        })()}

        <div className="w-full flex justify-center">
          <button
            onClick={() => {
              setBookingIdRefundId(booking._id);
              setPopup(true);
            }}
            className="px-5 py-1 border-2 border-red-600 rounded-xl text-lg transition-all duration-300 hover:text-white hover:bg-red-600 min-w-[150px] sm:min-w-[200px] cursor-pointer font-bold"
          >
            REFUND
          </button>
        </div>
      </div>
    </div>
  );
};
export default MyBookingsItem;
