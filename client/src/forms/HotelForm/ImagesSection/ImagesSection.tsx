import { FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  HotelFetchedType,
  HotelFormDataType,
} from "../../../context/types/hotels";
import ContentImages from "./ContentImages";
import { useImageSection } from "./useImageSection";

type PropsType = {
  hotel?: HotelFetchedType;
  isLoading: boolean;
};

const ImagesSection: FC<PropsType> = ({ hotel, isLoading }) => {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<HotelFormDataType>();

  const {
    existingImgFiles,
    existingImages,
    handleDeleteImage,
    handleRemoveFile,
  } = useImageSection(watch, setValue, trigger);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>

      <div
        className="grid grid-cols-2 
      sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 place-content-center place-items-center"
      >
        <ContentImages
          {...{
            existingImgFiles,
            existingImages,
            handleDeleteImage,
            handleRemoveFile,
            isLoading,
          }}
        />
      </div>

      <div className="border rounded-2 p-4 flex flex-col rounded-xl border-green-600 mt-5 focus_input">
        <label className="w-full">
          <input
            type="file"
            multiple
            accept="image/*"
            {...register(hotel ? "images" : "imageFiles", {
              validate: (imgFiles) => {
                const totLength = imgFiles?.length;

                if (!totLength) return "at least one image is required";
                if (totLength > 6) return "maximum 6 images are allowed";
                return true;
              },
            })}
            className="hidden"
          />
          <button
            type="button"
            disabled={isLoading}
            onClick={(e) =>
              (
                e.currentTarget.previousElementSibling as HTMLInputElement
              )?.click()
            }
            className="btn w-3/4 sm:w-1/2"
          >
            Upload File
          </button>
        </label>
      </div>

      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-normal ml-1">
          {errors.imageFiles.message as string}
        </span>
      )}
      {errors.images && (
        <span className="text-red-500 text-sm font-normal ml-1">
          {errors.images.message as string}
        </span>
      )}
    </div>
  );
};
export default ImagesSection;
