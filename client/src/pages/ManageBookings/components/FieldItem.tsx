import { FC } from "react";
import { formatDateForUser } from "../../../utils/formatDate";
import { priceFormatter } from "../../../utils/priceFormatter";

type PropsType = {
  field: any;
  dynamicVar: any;
};

const FieldItem: FC<PropsType> = ({ field, dynamicVar }) => {
  return (
    <div className="w-full grid-cols-[30px_1fr] gap-y-3 grid">
      <span className="w-full flex items-center gap-3 font-bold sm:text-lg">
        <field.icon className="h-[20px] w-[20px] " />
      </span>
      <span className="font-semibold pb-1 border-b-2 border-green-600 overflow-x-auto hide_scrollbar">
        {["checkIn", "checkOut"].includes(field.field)
          ? formatDateForUser(new Date(dynamicVar[field.field]))
          : ["totalPrice", "pricePerNight"].includes(field.field)
          ? priceFormatter(dynamicVar[field.field])
          : dynamicVar[field.field]}
      </span>
    </div>
  );
};
export default FieldItem;
