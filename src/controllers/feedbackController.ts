import { Request, Response } from "express";
import { getFeedbackByRestaurant, addFeedback } from "../models/feedbackModel";

export const fetchFeedback = async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurant_id = parseInt(req.params.restaurant_id);
        const feedbacks = await getFeedbackByRestaurant(restaurant_id);
        res.status(200).json(feedbacks);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
}

export const addFeedbackHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { restaurant_id, comment, rating } = req.body;
        const userId = (req as any).user.id;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        await addFeedback({ user_id: userId, restaurant_id, comment, rating });
        res.status(201).json({ message: "Feedback added successfully" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};