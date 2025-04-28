import { FC } from "react";
import { formatDateForUser } from "../../../utils/formatDate";

type PropsType = {
  checkIn: Date;
  checkOut: Date;
};

const SpanDates: FC<PropsType> = ({ checkIn, checkOut }) => {
  return (
    <div className="w-full text-lg flex gap-x-5 gap-y-2 flex-wrap">
      <div className="font-semibold">
        from&nbsp;
        <span className="font-bold text-xl text-green-600">
          {formatDateForUser(checkIn)}&nbsp;
        </span>
      </div>
      <div className="font-semibold">
        to&nbsp;
        <span className="font-bold text-xl text-green-600">
          {formatDateForUser(checkOut)}
        </span>
      </div>
    </div>
  );
};
export default SpanDates;
