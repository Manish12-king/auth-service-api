
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { resolve } from "node:dns";
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        // 1. Required fields validation
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email and password are required"
            });
        }

        // 2. Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address"
            });
        }

        // 3. Password validation
        if (
            password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/[0-9]/.test(password)
        ) {
            return res.status(400).json({
                message:
                    "Password must be at least 8 characters and contain uppercase, lowercase and a number"
            });
        }

        // 4. Check duplicate username
        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            return res.status(409).json({
                message: "Username already taken"
            });
        }

        // 5. Check duplicate email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already registered"
            });
        }

        // 6. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 7. Create the user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // 8. Send success response
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        console.error("Registration error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // 1. Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // 2. Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // 3. Compare password with stored hash
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // 4. Generate access token
        const accessToken = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET!,
            { expiresIn: "15m" }
        );

        // 5. Login successful
        return res.status(200).json({
            message: "Login successful",
            accessToken: accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getProfile= async(req: Request, res: Response, next: NextFunction)=>{

    try {
        const user = await User.findById(res.locals.userId)
            .select("-password");

            if(!user){
                return res.status(401).json({
                    message: " User not found "
                });
            }
            return res.status(200).json({
            message: "Profile fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    }catch (error){

        console.error("Profile error:", error);
        return res.status(404).json({
             message: "Internal server error"
        });
    }
};





