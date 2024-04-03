// Create

import { removeFromCloudinary, uploadToCloudinary } from "../lib/cloudinary.js";
import Song from "../models/song.model.js";

// add one song to db
const addSong = async (req, res) => {
  const { title, artist, album, genre } = req.body;

  try {
    if (
      req.files &&
      req.files.newSong &&
      req.files.newSong.length > 0 &&
      req.files.coverImage &&
      req.files.coverImage.length > 0
    ) {
      let newSongRes;
      let coverImageRes;
      try {
        newSongRes = await uploadToCloudinary(
          req.files.newSong[0]?.path,
          "player/songs"
        );
        coverImageRes = await uploadToCloudinary(
          req.files.coverImage[0]?.path,
          "player/coverImages"
        );
      } catch (error) {
        return res.status(500).json({
          message: "Failed to upload! Check your internet connection ",
        });
      }
      let song = {
        title,
        artist,
        album,
        genre: genre.toLowerCase(),
        song: { songUrl: newSongRes.url, public_id: newSongRes.public_id },
        coverImage: {
          imageUrl: coverImageRes.url,
          public_id: coverImageRes.public_id,
        },
      };
      const newSong = await Song.create(song);
      if (newSong) {
        return res
          .status(201)
          .json({ data: newSong, message: "Song created successfuly" });
      }
    } else {
      console.log("all fileds are required");
      return res.status(403).json({ message: "All fileds are required" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occured while creating the song" });
  }
};

// Read

// get song by id
const getSong = async (req, res) => {
  const songId = req.params.id;
  try {
    const song = await Song.findById({ _id: songId });
    res.status(200).json({ data: song });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "No song with that ID found" });
  }
};

// get the number of songs
const getTotalSongCount = async (req, res) => {
  try {
    const songCount = await Song.find({}).count();
    res.status(200).json({ data: songCount });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Could not get song count" });
  }
};

// get the number of artists
const getTotalArtistCount = async (req, res) => {
  try {
    const artictCount = await Song.find({}).distinct("artist");
    res.status(200).json({ data: artictCount.length });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Could not get artist count" });
  }
};

// get the number of albums
const getTotalAlbumCount = async (req, res) => {
  try {
    const albumCount = await Song.find({}).distinct("album");
    res.status(200).json({ data: albumCount.length });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Could not get  album count" });
  }
};

// get the number of genres
const getTotalGenreCount = async (req, res) => {
  try {
    const genreCount = await Song.find({}).distinct("genre");
    res.status(200).json({ data: genreCount.length });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Could not get genre count" });
  }
};

// get count of song, album, artist, and genre in one
const getTotalCatCount = async (req, res) => {
  try {
    const data = [];
    const songCount = await Song.find({}).count();
    data.push({ songCount: songCount });
    const albumCount = await Song.find({}).distinct("album");
    data.push({ albumCount: albumCount.length });
    const artistCount = await Song.find({}).distinct("artist");
    data.push({ artistCount: artistCount.length });
    const genreCount = await Song.find({}).distinct("genre");
    data.push({ genreCount: genreCount.length });
    res.json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Could not get category count" });
  }
};

// get the number of songs in genre
const getSongCountInGenre = async (req, res) => {
  try {
    const songsInGenre = await Song.aggregate([
      {
        $group: {
          _id: "$genre",
          genre: { $first: "$genre" },
          genreCount: { $count: {} },
        },
      },
      { $sort: { genre: 1 } },
    ]);
    res.status(200).json({ data: songsInGenre });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Could not get song count in genre" });
  }
};

// get the number of songs and album of an artist
const getArtistSongAndAlbum = async (req, res) => {
  const artist = req.params.artist;
  try {
    const count = await Song.aggregate([
      {
        $group: {
          _id: "$artist",
          artistName: { $first: "$artist" },
          songCount: { $sum: 1 },
          albumCount: { $addToSet: "$album" },
        },
      },
      {
        $project: {
          _id: 0,
          artistName: 1,
          songCount: 1,
          albumCount: { $size: "$albumCount" },
        },
      },
    ]);

    res.status(200).json({ data: count });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Error getting Artist Song & Album Count!" });
  }
};

// get songs in an album
const getSongInAlbum = async (req, res) => {
  const album = req.params.album;
  try {
    const songsInAlbum = await Song.find({ album });
    if (!songsInAlbum)
      return res.status(404).json({ message: "Album not found!" });
    res.status(200).json({ data: songsInAlbum });
  } catch (error) {
    console.log(error);
  }
};

// get songs of an artist
const getArtistSongs = async (req, res) => {
  const artist = req.params.artist;
  try {
    const artistsongs = await Song.find({ artist });
    if (!artistsongs)
      return res.status(404).json({ message: "Artist not found!" });
    res.status(200).json({ data: artistsongs });
  } catch (error) {
    console.log(error);
  }
};

// get songs in an album
const getSongInGenre = async (req, res) => {
  const genre = req.params.genre;
  try {
    const songsInGenre = await Song.find({ genre });
    if (!songsInGenre)
      return res.status(404).json({ message: "Genre not found!" });
    res.status(200).json({ data: songsInGenre });
  } catch (error) {
    console.log(error);
  }
};

// get songs in playlist
const getSongInPlaylist = async (req, res) => {
  const playlist = req.params.playlist;
  try {
    const foundPlaylist = await Song.find({ playlist });
    if (!foundPlaylist)
      return res.status(404).json({ message: "Playlist not found!" });
    res.status(200).json({ data: foundPlaylist });
  } catch (error) {
    console.log(error);
  }
};

// get all the songs
const getAllSongs = async (req, res) => {
  try {
    const foundSongs = await Song.find({}).sort({ $natural: -1 });
    res.status(200).json({ data: foundSongs });
  } catch (error) {
    console.log(error);
  }
};

// get all the distinct albums
const getAllAlbums = async (req, res) => {
  try {
    const foundAlbums = await Song.aggregate([
      {
        $group: {
          _id: "$album",
          artist: { $first: "$artist" },
          albumTitle: { $first: "$album" },
          coverImage: { $first: "$coverImage" },
          songCount: { $sum: 1 },
        },
      },
      { $sort: { albumTitle: 1 } },
    ]);
    res.status(200).json({ data: foundAlbums });
  } catch (error) {
    console.log(error);
  }
};
// get all the distict artists number of songs
const getAllArtists = async (req, res) => {
  try {
    const foundArtists = await Song.aggregate([
      {
        $group: {
          _id: "$artist",
          artist: { $first: "$artist" },
          coverImage: { $first: "$coverImage" },
          songCount: { $sum: 1 },
        },
      },
      { $sort: { artist: 1 } },
    ]);
    res.status(200).json({ data: foundArtists });
  } catch (error) {
    console.log(error);
  }
};
// get all the distict genres number of songs
const getAllGenres = async (req, res) => {
  try {
    const foundGenres = await Song.aggregate([
      {
        $group: {
          _id: "$genre",
          genre: { $first: "$genre" },
          songCount: { $sum: 1 },
        },
      },
      { $sort: { genre: 1 } },
    ]);
    res.status(200).json({ data: foundGenres });
  } catch (error) {
    console.log(error);
  }
};

// Update

// update song by id
const updateSong = async (req, res) => {
  let songId = req.body.id;
  const { title, artist, album, genre } = req.body;
  try {
    if (
      req.files &&
      req.files.newSong &&
      req.files.newSong.length > 0 &&
      req.files.coverImage &&
      req.files.coverImage.length > 0
    ) {
      let newSongRes;
      let coverImageRes;
      try {
        newSongRes = await uploadToCloudinary(
          req.files.newSong[0]?.path,
          "player/Songs"
        );
        coverImageRes = await uploadToCloudinary(
          req.files.coverImage[0]?.path,
          "player/coverImages"
        );
      } catch (error) {
        return res.status(500).json({
          message: "Failed to upload! Check your internet connection ",
        });
      }
      const result = await Song.findOneAndUpdate(
        { _id: songId },
        {
          title,
          artist,
          album,
          genre,
          coverImage: {
            imageUrl: coverImageRes.url,
            public_id: coverImageRes.public_id,
          },
          song: { songUrl: newSongRes.url, public_id: newSongRes.public_id },
        }
      );

      if (!result) return res.status(404).json({ message: "Song not found!" });
      const newSongList = await Song.find({});
      await removeFromCloudinary(result.song.public_id, "video");
      await removeFromCloudinary(result.coverImage.public_id, "image");
      return res
        .status(200)
        .json({ data: newSongList, message: "Song Updated successfuly" });
    } else {
      console.log("all fileds are required");
      return res.status(403).json({ message: "All fileds are required" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete

// delete song by id
const removeSong = async (req, res) => {
  const songId = req.params.id;
  try {
    const deletedSong = await Song.findOneAndDelete({ _id: songId });
    if (!deletedSong)
      return res.status(404).json({ message: "No song with this id!" });
    const newSongList = await Song.find({});
    await removeFromCloudinary(deletedSong.song.public_id, "video");
    await removeFromCloudinary(deletedSong.coverImage.public_id, "image");
    return res
      .status(200)
      .json({ data: newSongList, message: "Song deleted successfuly" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while trying to delete song" });
  }
};

export {
  addSong,
  getTotalSongCount,
  getTotalArtistCount,
  getTotalAlbumCount,
  getTotalGenreCount,
  getTotalCatCount,
  getSongCountInGenre,
  getArtistSongAndAlbum,
  getSongInAlbum,
  getArtistSongs,
  getSongInGenre,
  getSongInPlaylist,
  getSong,
  getAllSongs,
  getAllAlbums,
  getAllArtists,
  getAllGenres,
  updateSong,
  removeSong,
};
