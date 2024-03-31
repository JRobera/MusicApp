import { Schema, model } from "mongoose";

const playlistSchema = new Schema({
  name: { type: String, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: "song" }],
});

const Playlist = model("playlist", playlistSchema);

export default Playlist;
