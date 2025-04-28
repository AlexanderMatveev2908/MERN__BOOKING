import { FC } from "react";
import { HotelFormDataType } from "../../../context/types/hotels";

type PropsType = {
  existingImgFiles: FileList;
  existingImages: HotelFormDataType["images"] | FileList;
  handleDeleteImage: (
    e: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => void;
  handleRemoveFile: (
    e: React.MouseEvent<HTMLButtonElement>,
    file: File
  ) => void;
  isLoading: boolean;
};

const ContentImages: FC<PropsType> = ({
  existingImgFiles,
  existingImages,
  handleDeleteImage,
  handleRemoveFile,
  isLoading,
}) => {
  let content;

  if (existingImgFiles?.length) {
    content = [...existingImgFiles].map((file, i) => (
      <div key={i} className="w-full relative group">
        <img
          key={i}
          src={URL.createObjectURL(file)}
          alt={`preview: ${i}`}
          className="w-full max-w-[200px] h-[100px] object-cover"
        />
        <button
          disabled={isLoading}
          onClick={(e) => handleRemoveFile(e, file)}
          className="content_image__btn"
        >
          Remove
        </button>
      </div>
    ));
  } else if (existingImages?.length) {
    if (Array.isArray(existingImages)) {
      content = existingImages.map((img, i) => (
        <div key={i} className="w-full relative group">
          <img
            src={img.url}
            alt={`preview: ${i}`}
            className="w-full max-w-[200px] h-[100px] object-cover"
          />
          <button
            disabled={isLoading}
            onClick={(e) => handleDeleteImage(e, img.url)}
            className="content_image__btn"
          >
            Delete
          </button>
        </div>
      ));
    } else {
      content = [...(existingImages as FileList)].map((file, i) => (
        <div key={i} className="w-full relative group">
          <img
            src={URL.createObjectURL(file as any)}
            alt={`preview: ${i}`}
            className="w-full max-w-[200px] h-[100px] object-cover"
          />
          <button
            disabled={isLoading}
            onClick={(e) => handleRemoveFile(e, file)}
            className="content_image__btn"
          >
            Remove
          </button>
        </div>
      ));
    }
  }
  return content;
};
export default ContentImages;
