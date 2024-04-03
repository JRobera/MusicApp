import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  userName: { type: String },
  googleId: { type: String },
  email: { type: String },
  password: { type: String },
  profile: {
    type: String,
    default:
      "https://res.cloudinary.com/dbv6hao81/image/upload/v1692969059/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR_blqb4r.jpg",
  },
  playlist: [{ type: Schema.Types.ObjectId, ref: "playlist" }],
  refreshToken: { type: String },
});

const User = model("user", UserSchema);
export default User;
