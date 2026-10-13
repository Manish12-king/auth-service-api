
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
       
        const authHeader = req.headers.authorization;

        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                message: "Access token required"
            });
            return;
        }

        
        const token = authHeader.split(" ")[1];

        
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayload;

       
        res.locals.userId = decoded.userId;

        
        next();

    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};


