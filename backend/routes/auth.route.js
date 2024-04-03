import express from "express";
import {
  handleLogOut,
  handleRefreshToken,
  handleSignUp,
  handleSingIn,
} from "../controllers/auth.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
const authRouter = express.Router();

authRouter.post("/signup", handleSignUp);
authRouter.post("/signin", handleSingIn);
authRouter.get("/logout", handleLogOut);
authRouter.get("/refresh_token", handleRefreshToken);

export default authRouter;
