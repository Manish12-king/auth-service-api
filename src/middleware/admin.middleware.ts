
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model.js";

export const requireAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findById(res.locals.userId).select("role");

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        if (user.role !== "admin") {
            return res.status(403).json({
                message: "Admin access required"
            });
        }

        next();
    } catch (error) {
        console.error("Authorization error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
