import { model, Schema } from "mongoose";

const SongSchema = new Schema(
  {
    title: { type: String, required: true },
    song: {
      songUrl: { type: String },
      public_id: { type: String },
    },
    coverImage: {
      imageUrl: { type: String, default: "./T.png" },
      public_id: { type: String },
    },
    artist: { type: String },
    album: { type: String, default: "UN" },
    genre: { type: String, default: "UN" },
  },
  {
    timestamps: true,
  }
);

const Song = model("song", SongSchema);
export default Song;
