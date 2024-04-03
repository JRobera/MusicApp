import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

// Routes
import authRouter from "./routes/auth.route.js";
import songRoute from "./routes/song.route.js";
import userRoute from "./routes/user.route.js";
import dbConnect from "./db/connection.js";
import cookieParser from "cookie-parser";
import isAuthenticated from "./middleware/isAuthenticated.js";

dbConnect();

const app = express();
app.use(
  cors({
    origin: [
      "https://music-app-eight-ochre.vercel.app",
      "https://music-app-eight-ochre.vercel.app/",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth/", authRouter);
app.use("/api/", isAuthenticated, songRoute);
app.use("/api/", isAuthenticated, userRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
