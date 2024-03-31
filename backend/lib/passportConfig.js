import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const googleId = profile.id;
      const name = profile.displayName;
      const email = profile._json.email;
      const picture = profile._json.picture;
      const foundUser = await User.findOne({ googleId: profile.id });
      if (foundUser) {
        return done(null, foundUser);
      } else {
        const user = await User.create({
          userName: name,
          email,
          googleId,
          profile: picture,
        });
        return done(null, user);
      }
    }
  )
);

//serialize and deserialize are used to turn a javascript object into a string that can be stored in the session
// serialize and deserialize users so that the information can be stored in sessions
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, {
        _id: user._id,
        userName: user.userName,
        profile: user.profile,
        email: user.email,
      });
    })
    .catch((err) => console.log(err));
});
