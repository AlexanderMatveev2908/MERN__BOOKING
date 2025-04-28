import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotelsAsAdmin,
  getSingleHotelAsAdmin,
  updateHotel,
} from "../controllers/adminHotelsControllers";
import asyncWrapper from "../middleware/general/asyncWrapper";
import { validatorHotel } from "../middleware/hotels/validatorHotel";
// import { uploadMiddlewareBulk } from "../middleware/middlewareBulk";
// import { bulkUpload } from "../controllers/bulk";
import { uploadMiddleware } from "../middleware/hotels/multerMiddleware";
import verifyToken from "../middleware/general/verifyToken";
import { verifyAccessTokenMiddleware } from "../middleware/general/validateAccessToken";

const router = express.Router();

// router.post(
//   "/bulk",
//   uploadMiddlewareBulk.array("imageFiles", 6),
//   asyncWrapper(bulkUpload)
// );
// ignore above route, did it just for exercise purposes
router
  .route("/")
  .get(verifyAccessTokenMiddleware, asyncWrapper(getHotelsAsAdmin))
  .post(
    verifyAccessTokenMiddleware,
    uploadMiddleware.array("imageFiles", 6),
    validatorHotel,
    asyncWrapper(createHotel)
  );

router
  .route("/:id")
  .get(verifyAccessTokenMiddleware, asyncWrapper(getSingleHotelAsAdmin))
  .put(
    verifyAccessTokenMiddleware,
    uploadMiddleware.array("imageFiles", 6),
    validatorHotel,
    asyncWrapper(updateHotel)
  )
  .delete(verifyAccessTokenMiddleware, asyncWrapper(deleteHotel));

export default router;
