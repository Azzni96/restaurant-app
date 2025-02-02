import express from "express"
import { fetchRestaurants, addRestaurant } from "../controllers/restaurantController"
import upload from "../utils/multerConfig";

const router = express.Router();

router.get("/", fetchRestaurants)
router.post("/", upload.single("image"), addRestaurant)

export default router;