import { v2 as cloudinary } from "cloudinary";
import { HotelType } from "../models/Hotel";
// import path from "path";
// import fs from "fs";

export const uploadCloudinary = (
  imageFiles: Express.Multer.File[]
): Promise<HotelType["images"]> => {
  const uploadPromises = imageFiles.map(async (img) => {
    const b64 = img.buffer.toString("base64");

    const dataURI = "data:" + img.mimetype + ";base64," + b64;

    const res = await cloudinary.uploader.upload(dataURI, {
      folder: "hotels",
    });
    return { url: res.url, public_id: res.public_id };
  });

  return Promise.all(uploadPromises);
};

export const deleteCloudinary = async (publicIds: string[]): Promise<void> => {
  for (const id of publicIds) {
    await cloudinary.uploader.destroy(id);
  }
};

// export const uploadCloudinaryForBulk = async (imageFiles: any[]) => {
//   const promises = imageFiles.map(async (file) => {
//     const filePath = path.join(__dirname, "..", "uploads", file.filename);

//     const res = await cloudinary.uploader.upload(filePath, {
//       folder: "hotels",
//     });

//     fs.unlink(filePath, (err) => {
//       if (err) console.log(err);
//     });

//     return { url: res.url, public_id: res.public_id };
//   });

//   return Promise.all(promises);
// };
