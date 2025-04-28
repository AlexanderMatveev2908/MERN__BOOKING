import { FC } from "react";
import { maxDate, minDate, searchFieldADatesArr } from "../fieldsArr";
import DatePicker from "react-datepicker";

type PropsType = {
  dynamicValDates: { [key: string]: Date | null };
  checkIn: Date;
  checkOut: Date;
  handleChangeSearchDate: (date: Date | null, field: string) => void;
};

const DateFields: FC<PropsType> = ({
  dynamicValDates,
  checkIn,
  checkOut,
  handleChangeSearchDate,
}) => {
  return searchFieldADatesArr.map((field) => (
    <div
      key={field.id}
      className="grid relative z-30 grid-cols-1 gap-y-2 sm:grid-cols-[120px_250px] md:grid-cols-[120px_1fr] items-center"
    >
      <span className="font-semibold text-lg sm:text-xl">{field.label}</span>
      <DatePicker
        selected={dynamicValDates[field.name]}
        selectsStart
        startDate={checkIn}
        endDate={checkOut}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText="Check-in Date"
        className="px-5 py-1 bg-transparent text-[whitesmoke] outline-none focus_input w-full rounded-xl border-2 border-green-600 text-lg sm:text-xl font-semibold"
        name={field.name}
        onChange={(date) => handleChangeSearchDate(date, field.name)}
        dateFormat="dd/MM/yyyy"
        popperPlacement="bottom-start"
      />
    </div>
  ));
};
export default DateFields;
