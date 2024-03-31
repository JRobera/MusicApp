//
const authenticateUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication failed." });
  } else {
    return res.status(200).redirect(process.env.CLIENT_URL_HOME);
  }
};
//
const verified = async (req, res) => {
  res.json(req.user);
};
//
const logOut = async (req, res, next) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL_ROOT);
};
export { authenticateUser, verified, logOut };
