import { FC, ReactElement } from "react";
import { useFormContext } from "react-hook-form";
import {
  FieldHotelType,
  fieldsHotelArr,
  fieldsToPut2InRow,
} from "./fieldsHotel";
import FieldHotel from "./FieldHotel/FieldHotel";
import {
  HotelFetchedType,
  HotelFormDataType,
} from "../../../context/types/hotels";

type PropsType = {
  title: string;
  hotel?: HotelFetchedType;
  setPopupOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DetailsSection: FC<PropsType> = ({ title, hotel, setPopupOpen }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormDataType>();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between flex-wrap items-center">
        <h1 className="text-3xl font-bold">{title}</h1>

        {hotel && (
          <div className="flex justify-end mt-5 w-full sm:max-w-fit sm:mt-0">
            <button
              onClick={() => setPopupOpen?.(true)}
              type="button"
              className="details_section__btn pseudo_btn"
            >
              Delete This Hotel
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5">
        {((): ReactElement[] => {
          const els = [];

          for (let i = 0; i < fieldsHotelArr.length; i++) {
            const field: FieldHotelType = fieldsHotelArr[i];

            if (
              fieldsToPut2InRow.includes(field.field) &&
              fieldsToPut2InRow.includes(fieldsHotelArr[i + 1].field)
            ) {
              els.push(
                <div
                  key={field.id + fieldsHotelArr[i + 1].id}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <FieldHotel {...{ field, errors, register }} />
                  <FieldHotel
                    {...{ field: fieldsHotelArr[i + 1], errors, register }}
                  />
                </div>
              );
              i++;
            } else {
              els.push(
                <FieldHotel key={field.id} {...{ field, errors, register }} />
              );
            }
          }

          return els;
        })()}
      </div>
    </div>
  );
};
export default DetailsSection;
