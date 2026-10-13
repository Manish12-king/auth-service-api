
import { Router } from "express";
import {
    getProfile,
    loginUser,
    registerUser
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/Profile", authMiddleware, getProfile);

router.get(
    "/admin",
    authMiddleware,
    requireAdmin,
    (req, res) => {
        return res.status(200).json({
            message: "Welcome Admin! Access granted."
        });
    }
);

export default router;
