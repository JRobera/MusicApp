import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//
const handleSignUp = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    if (!userName || !email || !password)
      return res.status(400).json({ message: "All fields are required" });
    const foundUser = await User.findOne({ email: email });
    if (foundUser)
      return res.status(401).json({ message: "User is already in exists" });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) throw err;
        const user = await User.create({ userName, email, password: hash });
        const payload = {
          _id: user._id,
          userName: user.userName,
          email: user.email,
          profile: user.profile,
        };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "15m",
        });
        const refreshToken = jwt.sign(
          payload,
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "3d",
          }
        );
        const updateUser = await User.updateOne({ email }, { refreshToken });

        res.cookie("jwt", refreshToken, {
          withCredentials: true,
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 3,
        });
        res.status(201).json({ data: accessToken });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const handleSingIn = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (!foundUser)
    return res.status(401).json({ message: "Invalid Credentials" });
  try {
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const payload = {
        _id: foundUser._id,
        userName: foundUser.userName,
        email: foundUser.email,
        profile: foundUser.profile,
      };

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "3d",
      });
      const userUpdate = await User.updateOne({ email }, { refreshToken });
      res.cookie("jwt", refreshToken, {
        withCredentials: true,
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 3,
      });
      return res.status(200).json({ data: accessToken });
    } else {
      return res.status(401).json({ message: "Invalid Password" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const handleLogOut = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }
  const fUser = await User.updateOne({ refreshToken }, { refreshToken: "" });
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  return res.sendStatus(204);
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) return res.sendStatus(403);
  const payload = {
    _id: foundUser._id,
    userName: foundUser.userName,
    email: foundUser.email,
    profile: foundUser.profile,
  };
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err || foundUser.userName !== user.userName) return res.sendStatus(403);
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    return res.status(200).json({ data: accessToken });
  });
};

export { handleSignUp, handleSingIn, handleLogOut, handleRefreshToken };
