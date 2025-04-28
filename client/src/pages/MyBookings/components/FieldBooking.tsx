import { FC } from "react";

type PropsType = {
  dynamicVar: any;
  field: any;
};

const FieldLeft: FC<PropsType> = ({ dynamicVar, field }) => {
  return (
    <div className="w-full grid-cols-[30px_1fr] gap-y-3 grid">
      <span className="w-full flex items-center gap-3 font-bold sm:text-lg">
        <field.icon className="h-[20px] w-[20px] " />
      </span>
      <span className="font-semibold pb-1 border-b-2 border-green-600 truncate">
        {dynamicVar[field.field]}
      </span>
    </div>
  );
};
export default FieldLeft;
