// import { Request, Response } from "express";
// import { uploadCloudinary, uploadCloudinaryForBulk } from "../utils/cloudinary";
// import Hotel from "../models/Hotel";

// const userId = "67a793e01a1f5e94a72692ac";
// export const bulkUpload = async (req: Request, res: Response): Promise<any> => {
//   const imageFiles = req.files as any;
//   const newHotel = req.body;

//   try {
//     const images = await uploadCloudinaryForBulk(imageFiles);

//     newHotel.images = images;
//     newHotel.lastUpdated = new Date();
//     newHotel.userId = userId;

//     await Hotel.create(newHotel);

//     res.status(201).json({ msg: "hotel created successfully", success: true });
//   } catch (err: any) {
//     res.status(500).json({ msg: err.message, success: false });
//   }
// };
