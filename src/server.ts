import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Auth Service API is running"
    });
});

mongoose.connect(process.env.MONGODB_URL!)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });


app.listen(5000, () => {
    console.log("Server running on port 5000");
});