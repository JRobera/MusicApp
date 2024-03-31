import Playlist from "../models/playList.model.js";
import User from "../models/user.model.js";

const createPlaylist = async (req, res) => {
  const userId = req.params.userId;
  const playlistName = req.body.playlistName;
  try {
    const foundPlaylist = await Playlist.findOne({ name: playlistName });
    if (!foundPlaylist) {
      const playlist = await Playlist.create({ name: playlistName });
      const result = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { playlist: playlist._id } },
        { new: true }
      );
      const newPlaylist = await User.findById({ _id: userId })
        .populate({
          path: "playlist",
        })
        .select(["playlist -_id"]);
      return res.status(201).json({ data: newPlaylist });
    } else {
      return res.status(409).send("This playlist already exists");
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const fetchPlaylists = async (req, res) => {
  const userId = req.params.userId;
  try {
    const foundPlaylists = await User.findById({ _id: userId })
      .select("playlist -_id")
      .populate("playlist");
    return res.status(200).json({ data: foundPlaylists });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const fetchPlaylist = async (req, res) => {
  const playlistId = req.params.playlistId;
  try {
    const foundPlaylists = await Playlist.findById({ _id: playlistId })
      // .select("_id")
      .populate("songs");
    return res.status(200).json({ data: foundPlaylists });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const addOrRemoveSongToPlaylist = async (req, res) => {
  const { songId, playlistId } = req.query;
  try {
    const foundSong = await Playlist.findOne({
      _id: playlistId,
      songs: { $in: [songId] },
    });
    if (!foundSong) {
      const songsInPlaylist = await Playlist.findOneAndUpdate(
        { _id: playlistId },
        { $push: { songs: songId } },
        { new: true }
      );
      const updatedPlaylist = await Playlist.findById({
        _id: playlistId,
      }).populate("songs");
      return res.status(201).json({ data: updatedPlaylist });
    } else {
      const newPlaylistItem = await Playlist.findOneAndUpdate(
        { _id: playlistId },
        { $pull: { songs: songId } }
      );
      const updatedPlaylist = await Playlist.findById({
        _id: playlistId,
      }).populate("songs");
      return res.status(200).json({ data: updatedPlaylist });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error adding the Song to the playlist" });
  }
};

const deletePlaylist = async (req, res) => {
  const { userId, playlistId } = req.query;
  try {
    const result = await Playlist.deleteOne({ _id: playlistId });
    const userUpdate = await User.updateOne(
      { _id: userId },
      { $pull: { playlist: playlistId } }
    );
    if (!result.deletedCount) {
      return res.status(302).json({ message: "Failed to delete playlist" });
    }
    const foundPlaylists = await User.findById({ _id: userId })
      .select("playlist -_id")
      .populate("playlist");
    return res.status(200).json({ data: foundPlaylists });
  } catch (error) {
    return res.status(500).json({ data: "Error while deleting playlist!" });
  }
};

export {
  createPlaylist,
  fetchPlaylists,
  fetchPlaylist,
  addOrRemoveSongToPlaylist,
  deletePlaylist,
};
