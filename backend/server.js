import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import queueRouter from "./queueRouter.js"; // Ensure this path is correct

const app = express();
dotenv.config();

// Connect to MongoDB
mongoose
    .connect('mongodb+srv://sharada:Fmo01dDtNLPUViox@careerqueuecluster0.tuz6h.mongodb.net/')
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB connection error: ", err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}));
app.use(morgan("dev"));
app.use(cookieParser());

// Queue routes
app.use("/queue", queueRouter);

// Basic route
app.get("/", (req, res) => {
    res.json({ msg: "Welcome G=Hack!" });
});



// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
