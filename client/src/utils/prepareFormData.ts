import { HotelFormDataType, ImageType } from "../context/types/hotels";

export const prepareFormData = (formDataObj: HotelFormDataType): FormData => {
  const formData = new FormData();

  Object.keys(formDataObj ?? {}).forEach((key) => {
    const val = formDataObj[key as keyof HotelFormDataType];

    if (Array.isArray(val)) {
      if (key === "facilities") {
        val.forEach((facility, i) => {
          formData.append(`facilities[${i}]`, facility as string);
        });
      } else if (key === "images") {
        val.forEach((image, i) => {
          const img = image as ImageType;
          formData.append(`images[${i}][public_id]`, img.public_id as string);
        });
      }
    } else if (typeof val === "object") {
      Array.from(val).forEach((file) => {
        formData.append(`imageFiles`, file);
      });
    } else {
      formData.append(key, typeof val === "number" ? "" + val : (val as any));
    }
  });

  return formData;
};
