import { Request, Response } from "express";
import { deleteCloudinary, uploadCloudinary } from "../utils/cloudinary";
import Hotel, { HotelType, ImageType } from "../models/Hotel";
import mongoose from "mongoose";

export const createHotel = async (
  req: Request,
  res: Response
): Promise<any> => {
  const imageFiles = req.files as Express.Multer.File[];
  const newHotel: HotelType = req.body;
  const { userId } = req;

  const publicCloudIds: string[] = [];

  try {
    const images = await uploadCloudinary(imageFiles);

    images.forEach((img) => publicCloudIds.push(img.public_id));

    newHotel.images = images;
    newHotel.lastUpdated = new Date();
    newHotel.userId = userId!;

    await Hotel.create(newHotel);

    res.status(201).json({ msg: "hotel created successfully", success: true });
  } catch (err: any) {
    // if err occur delete imgs uploaded till now
    if (publicCloudIds?.length) await deleteCloudinary(publicCloudIds);

    res.status(500).json({
      msg: "Internal error, don't worry we are working on it 🔨🔨🔨",
      success: false,
    });
  }
};

export const getHotelsAsAdmin = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { limit = "5", page = "1", sort = "desc" } = req.query;

  const limitNum = Math.max(parseInt(limit as string, 10), 1);
  const currPage = Math.max(parseInt(page as string, 10), 1);
  const skipNum = (currPage - 1) * limitNum;
  const totHotels = await Hotel.countDocuments({ userId });
  const totalPages = Math.max(Math.ceil(totHotels / limitNum), 1);

  const hotels = await Hotel.find({ userId })
    .sort({
      lastUpdated: sort === "asc" ? 1 : -1,
    })
    .skip(skipNum)
    .limit(limitNum);

  if (!hotels?.length)
    return res
      .status(200)
      .json({ msg: "No hotels found", hotels: [], success: false });

  return res.status(200).json({
    nHits: hotels.length,
    totalPages,
    hotels,
    success: true,
  });
};

export const getSingleHotelAsAdmin = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { userId } = req;

  if (!id || !mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ success: false, msg: "Hotel not found", hotel: null });

  const hotel = await Hotel.findOne({ _id: id, userId });
  if (!hotel)
    return res
      .status(404)
      .json({ success: false, msg: "Hotel not found", hotel: null });

  return res.status(200).json({ success: true, hotel });
};

export const updateHotel = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { id } = req.params;
  const imageFiles = req?.files as Express.Multer.File[];

  if (!id || !mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ success: false, msg: "Hotel not found", hotel: null });

  const hotel = await Hotel.findOne({ _id: id, userId });
  if (!hotel)
    return res.status(404).json({ success: false, msg: "Hotel not found" });

  const existingImages: ImageType[] = hotel.images;
  const existingImageIds = existingImages.map((img) => img.public_id);

  const { hotelId, ...rest } = req.body;
  const updatedHotel: HotelType = rest;

  const publicCloudIds: string[] = [];

  try {
    if (!imageFiles?.length) {
      const updatedImageIds: any[] = updatedHotel.images.map(
        (img: any) => img.public_id
      );

      await deleteCloudinary(
        existingImageIds.filter((id: string) => !updatedImageIds.includes(id))
      );

      updatedHotel.images = existingImages.filter((img) =>
        updatedImageIds.includes(img.public_id)
      );
    } else {
      await deleteCloudinary(existingImageIds);

      const images = await uploadCloudinary(imageFiles);
      images.forEach((img) => publicCloudIds.push(img.public_id));

      updatedHotel.images = images;
    }

    updatedHotel.lastUpdated = new Date();

    await Hotel.findOneAndUpdate({ _id: id, userId }, updatedHotel);

    return res
      .status(200)
      .json({ msg: "hotel updated successfully", success: true });
  } catch (err: any) {
    if (publicCloudIds?.length) await deleteCloudinary(publicCloudIds);

    return res.status(500).json({
      msg: "Internal error, don't worry we are working on it 🔨🔨🔨",
      success: false,
    });
  }
};

export const deleteHotel = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { userId } = req;

  const hotel = await Hotel.findOne({ _id: id, userId });
  if (!hotel)
    return res.status(404).json({ success: false, msg: "Hotel not found" });

  try {
    await deleteCloudinary(hotel.images.map((img: ImageType) => img.public_id));
    await Hotel.deleteOne({ _id: id, userId });
    return res
      .status(200)
      .json({ msg: "hotel deleted successfully", success: true });
  } catch (err: any) {
    return res.status(500).json({
      msg: "Internal error, don't worry we are working on it 🔨🔨🔨",
      success: false,
    });
  }
};
