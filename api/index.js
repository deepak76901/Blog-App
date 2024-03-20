import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
config();

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Database connected Successfully");
  } catch (error) {
    console.log("Database connection failed : ", error);
  }
};
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is Listening on Port:${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

// This is called when everytime error occured using next()
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";
  res.status(statusCode).json({
    success: false,
    message,
  });
});
