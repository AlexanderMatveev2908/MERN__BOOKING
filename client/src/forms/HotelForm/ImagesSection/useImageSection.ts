import { UseFormSetValue, UseFormTrigger, UseFormWatch } from "react-hook-form";
import { ImageType } from "../../../context/types/hotels";

export const useImageSection = (
  watch: UseFormWatch<any>,
  setValue: UseFormSetValue<any>,
  trigger: UseFormTrigger<any>
) => {
  const existingImgFiles = watch("imageFiles") || [];
  const existingImages = watch("images") || [];

  const handleDeleteImage = (
    e: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => {
    e.preventDefault();

    setValue(
      "images",
      existingImages.filter((img: ImageType) => img.url !== url)
    );
    trigger("images");
  };

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLButtonElement>,
    file: File
  ) => {
    e.preventDefault();

    const filesArr = existingImgFiles?.length
      ? Array.from(existingImgFiles)
      : Array.from(existingImages as any);

    const fileIndex = filesArr.findIndex(
      (f: any) =>
        f.name === file.name &&
        f.size === file.size &&
        f.lastModified === file.lastModified
    );

    if (fileIndex !== -1) {
      const updatedFiles = filesArr.filter(
        (_: any, i: number) => i !== fileIndex
      );

      const dataTransfer = new DataTransfer();
      updatedFiles.forEach((f) => dataTransfer.items.add(f as any));

      setValue(
        existingImgFiles?.length ? "imageFiles" : "images",
        dataTransfer.files
      );
      trigger("imageFiles");
      trigger("images");
    }
  };

  return {
    existingImgFiles,
    existingImages,
    handleDeleteImage,
    handleRemoveFile,
  };
};
