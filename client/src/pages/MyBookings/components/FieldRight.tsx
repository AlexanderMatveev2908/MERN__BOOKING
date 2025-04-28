import { FC } from "react";
import { formatDateForUser } from "../../../utils/formatDate";
import { priceFormatter } from "../../../utils/priceFormatter";

type PropsType = {
  dynamicVar: any;
  field: any;
};

const FieldRight: FC<PropsType> = ({ dynamicVar, field }) => {
  return (
    <div className="w-full grid-cols-[30px_1fr] gap-y-1 grid justify-items-center">
      <div className="w-full flex items-center gap-3 font-bold sm:text-lg">
        <field.icon className="w-[20px] h-[20px]" />
        <span className="hidden">{field.label}</span>
      </div>
      <span className="font-semibold px-5 py-1 border-b-2 border-green-600 break-words w-full ">
        {["checkIn", "checkOut"].includes(field.field)
          ? formatDateForUser(new Date(dynamicVar[field.field]))
          : ["totalPrice", "pricePerNight"].includes(field.field)
          ? priceFormatter(dynamicVar[field.field])
          : dynamicVar[field.field]}
      </span>
    </div>
  );
};
export default FieldRight;
