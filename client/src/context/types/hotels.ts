export type ImageType = {
  _id: string;
  public_id: string;
  url: string;
};

export type HotelFormDataType = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageFiles: FileList;
  images?: ImageType[];
};

export type HotelFetchedType = Omit<HotelFormDataType, "imageFiles"> & {
  _id: string;
  images: ImageType[];
};

export type HotelSearchedType = {
  data: HotelFetchedType[];
  totalPages: number;
  nHits: number;
  success: boolean;
};
