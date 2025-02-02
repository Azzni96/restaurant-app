import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getAllUsers, createUser, getUserByEmail, updateUserPassword, getUserById } from "../models/userModel";
import { sendEmail } from "../utils/emailService";

const SALT_ROUNDS = 10;
const JWT_SECRET = "restaurantapp2025#" // This should be stored in a .env file

export const signup = async (req: Request, res: Response) => {
    try{
        const {name, email, password} = req.body;
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }
        const hashedPassword = await bcryptjs.hash(password, SALT_ROUNDS);
        await createUser({name, email, password: hashedPassword});
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
}
export const login = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;
        const user = await getUserByEmail(email);
        if (!user) {
             res.status(400).json({ error: "Invalid email or password" });
            return
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
             res.status(400).json({ error: "Invalid email or password" });
             return
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
}
export const forgotPassword = async (req: Request, res: Response) => {
    try{
        const {email} = req.body;
        const user = await getUserByEmail(email);
        if (!user) {
             res.status(400).json({ error: "User not found" });
             return
        }
        const resetToken = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
        await sendEmail(
            email,
            "Password Reset Request",
            `Hi ${user.name},\n\nYou requested to reset your password. Click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`
          );
        res.status(200).json({ message: "Password reset link sent to your email"});
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, password } = req.body;
        const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
        const hashedPassword = await bcryptjs.hash(password, SALT_ROUNDS);
        await updateUserPassword(decoded.email, hashedPassword);
        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const fetchUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const addUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        await createUser(user);
        res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const user = await getUserById(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json({ name: user.name, email: user.email });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};