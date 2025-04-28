import express from "express";
import asyncWrapper from "../middleware/general/asyncWrapper";
import {
  getLatestHotels,
  getSearchedHotels,
  getSingleHotel,
} from "../controllers/hotelsControllers";
import { getIdUserMiddleware } from "../middleware/hotels/getIdUserMiddleware";

const router = express.Router();

router.get("/search", getIdUserMiddleware, asyncWrapper(getSearchedHotels));
router.get("/latest", getIdUserMiddleware, asyncWrapper(getLatestHotels));
router.get("/:id", getIdUserMiddleware, asyncWrapper(getSingleHotel));

export default router;
