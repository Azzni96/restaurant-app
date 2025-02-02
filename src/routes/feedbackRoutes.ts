import express from "express";
import { fetchFeedback, addFeedbackHandler } from "../controllers/feedbackController";
import { authenticate } from "../utils/authenticate";

const router = express.Router();

router.get("/:restaurant_id", fetchFeedback);

router.post("/", authenticate, addFeedbackHandler);

export default router;