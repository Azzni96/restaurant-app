import express from "express";
import { addLikeHandler, removeLikeHandler, getLikesHandler } from "../controllers/menuLikesController";
import authenticate from "../utils/authenticate";

const router = express.Router();

// Lisää tykkäys
router.post("/", authenticate, addLikeHandler);

// Poista tykkäys
router.delete("/", authenticate, removeLikeHandler);

// Hae tietyn ruokalajin tykkäykset
router.get("/:menuId", getLikesHandler);

export default router;
