import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";

// Routes
import authRouter from "./routes/auth.route.js";
import songRoute from "./routes/song.route.js";
import userRoute from "./routes/user.route.js";
import dbConnect from "./db/connection.js";

dbConnect();

const app = express();
import "./lib/passportConfig.js";
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth/", authRouter);
app.use("/api/", songRoute);
app.use("/api/", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
