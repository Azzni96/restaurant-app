import {Request, Response, NextFunction} from 'express';    
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || "restaurantapp2025#";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: "Unauthorized. No token provided." });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
        (req as any).user = decoded;
        next();
    } catch (error) {
        console.error("JWT Error:", error);
        res.status(401).json({ error: "Unauthorized. Invalid token." });
    }
};


export default authenticate;