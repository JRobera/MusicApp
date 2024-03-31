import express from "express";
const userRoute = express.Router();
import {
  createPlaylist,
  fetchPlaylists,
  fetchPlaylist,
  addOrRemoveSongToPlaylist,
  deletePlaylist,
} from "../controllers/user.controller.js";

userRoute.post("/create-playlist/:userId", createPlaylist);
userRoute.get("/getallplaylists/:userId", fetchPlaylists);
userRoute.get("/get-songs-playlist/:playlistId", fetchPlaylist);
userRoute.post("/add-to-playlist", addOrRemoveSongToPlaylist);
userRoute.delete("/remove-playlist", deletePlaylist);

export default userRoute;
