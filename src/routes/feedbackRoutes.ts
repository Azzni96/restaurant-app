import express from "express";
import { fetchFeedback, addFeedbackHandler } from "../controllers/feedbackController";
import { authenticate } from "../utils/authenticate";

const router = express.Router();

router.get("/:restaurant_id", fetchFeedback); // Ensure this path matches the frontend request

router.post("/", authenticate, addFeedbackHandler);

export default router;