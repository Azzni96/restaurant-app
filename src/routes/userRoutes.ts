import express from "express";
import { signup, login, forgotPassword, resetPassword, getProfile } from "../controllers/userController";
import { authenticate } from "../utils/authenticate";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/profile", authenticate, getProfile);

export default router;
