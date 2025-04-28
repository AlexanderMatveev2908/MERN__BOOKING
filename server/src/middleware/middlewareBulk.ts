import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

export const uploadMiddlewareBulk = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

// console.log(path.join(__dirname, "..", "uploads"));
