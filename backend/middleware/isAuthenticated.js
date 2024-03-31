const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).redirect(process.env.CLIENT_URL_ROOT);
  } else {
    next();
  }
};

export default isAuthenticated;
