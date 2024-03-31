import express from "express";
import passport from "passport";
import {
  authenticateUser,
  logOut,
  verified,
} from "../controllers/auth.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
const authRouter = express.Router();

authRouter.get("/isAuth", isAuthenticated, verified);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
); // redirect the user

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successReturnToOrRedirect: process.env.CLIENT_URL_HOME,
    failureRedirect: process.env.CLIENT_URL_ROOT,
  }),
  authenticateUser
);

authRouter.get("/logout", logOut);

export default authRouter;
