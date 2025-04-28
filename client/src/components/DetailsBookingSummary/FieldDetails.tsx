import { FC } from "react";

type PropsType = {
  dynamicVar: any;
  field: any;
};

const FieldDetails: FC<PropsType> = ({ field, dynamicVar }) => {
  return (
    <div
      key={field.id}
      className={`grid grid-cols-1 gap-y-2 ${
        field.field === "name" ? "sm:col-span-2" : ""
      }`}
    >
      <span className="font-semibold">{field.label}:</span>
      <span className="max-h-[60px] h-fit overflow-y-auto hide_scrollbar break-words px-5 py-1 border-2 border-green-600 rounded-xl">
        {dynamicVar[field.field as keyof typeof dynamicVar]}
      </span>
    </div>
  );
};
export default FieldDetails;
