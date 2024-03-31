import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  userName: { type: String },
  googleId: { type: String },
  email: { type: String },
  profile: { type: String },
  playlist: [{ type: Schema.Types.ObjectId, ref: "playlist" }],
});

const User = model("user", UserSchema);
export default User;
