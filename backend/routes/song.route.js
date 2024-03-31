import express from "express";
import {
  addSong,
  getAllSongs,
  getTotalAlbumCount,
  getTotalArtistCount,
  getTotalSongCount,
  getTotalGenreCount,
  removeSong,
  getSongCountInGenre,
  getArtistSongAndAlbum,
  getSongInAlbum,
  getSong,
  updateSong,
  getAllAlbums,
  getAllArtists,
  getArtistSongs,
  getSongInPlaylist,
  getTotalCatCount,
  getAllGenres,
  getSongInGenre,
} from "../controllers/songe.controller.js";
import upload from "../middleware/uploader.js";
const songRoute = express.Router();

// Create
songRoute.post(
  "/addsong",
  upload.fields([
    { name: "newSong", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  addSong
);
// songRoute.post("/", () => {});

// Read
songRoute.get("/totalsongs", getTotalSongCount);
songRoute.get("/totalartists", getTotalArtistCount);
songRoute.get("/totalalbums", getTotalAlbumCount);
songRoute.get("/totalgenres", getTotalGenreCount);
songRoute.get("/totalCatCount", getTotalCatCount);
songRoute.get("/song-count-in-genre", getSongCountInGenre);
songRoute.get("/artist-song-album", getArtistSongAndAlbum);
songRoute.get("/song-in-album/:album", getSongInAlbum);
songRoute.get("/artist-songs/:artist", getArtistSongs);
songRoute.get("/songs-in-genre/:genre", getSongInGenre);
songRoute.get("/song-in-playlist/:playlist", getSongInPlaylist);
songRoute.get("/getsong/:id", getSong);
songRoute.get("/getallsongs", getAllSongs);
songRoute.get("/getallalbums", getAllAlbums);
songRoute.get("/getallartists", getAllArtists);
songRoute.get("/getallgenres", getAllGenres);

// Update
songRoute.patch(
  "/updatesong",
  upload.fields([
    { name: "newSong", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  updateSong
);

// Delete
songRoute.put("/deletesong/:id", removeSong);

export default songRoute;
