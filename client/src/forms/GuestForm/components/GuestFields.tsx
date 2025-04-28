import { FC } from "react";
import { searchFieldAGuestsArr } from "../fieldsArr";

type PropsType = {
  dynamicValGuests: { [key: string]: string };
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorGuests: { [key: string]: string };
};

const GuestFields: FC<PropsType> = ({
  dynamicValGuests,
  handleChangeSearch,
  errorGuests,
}) => {
  return searchFieldAGuestsArr.map((field) => (
    <label
      key={field.id}
      className="grid grid-cols-1 gap-y-2 items-center sm:grid-cols-[120px_250px] md:grid-cols-[120px_1fr] "
    >
      <span className="font-semibold text-lg sm:text-xl">{field.label}</span>
      <input
        type="number"
        min={field.min}
        value={dynamicValGuests[field.name]}
        className="bg-transparent border-2 border-green-600 outline-none focus_input px-5 py-1 rounded-xl w-full text-lg sm:text-xl font-semibold"
        name={field.name}
        onChange={handleChangeSearch}
      />

      {errorGuests?.[field.name] && (
        <p className="sm:col-start-2 text-sm text-red-600">
          {errorGuests[field.name]}
        </p>
      )}
    </label>
  ));
};
export default GuestFields;
