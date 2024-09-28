import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// const cookieParser = require();
import morgan from "morgan";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error: ", err));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

//ROUTERS
// app.use("/users", usersRouter);
// app.use("/leagues", leaguesRouter);

app.get("/", (req, res) => {
  res.json({ mssg: "Welcome!" });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
  sendInvoice();
});
