import pool from "../database/DB";

export type Feedback = {
    id?: number;
    user_id: number;
    restaurant_id: number;
    comment: string;
    rating: number;
};

export const getFeedbackByRestaurant = async (restaurant_id: number): Promise<Feedback[]> => {
    const conn = await pool.getConnection();
    const rows = await conn.query(
        "SELECT feedback.id, feedback.comment, feedback.rating, feedback.created_at, users.name AS user_name FROM feedback inner join users on feedback.user_id = users.id WHERE restaurant_id = ?",
        [restaurant_id]
    );
    conn.release();
    return rows;
}

export const addFeedback = async (feedback: Feedback): Promise<void> => {
    const conn = await pool.getConnection();
    await conn.query(
        "INSERT INTO feedback (user_id, restaurant_id, comment, rating) VALUES (?, ?, ?, ?)",
        [feedback.user_id, feedback.restaurant_id, feedback.comment, feedback.rating]
    );
    conn.release();
};
