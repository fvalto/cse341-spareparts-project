const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json('You are not authenticated');
  }
  next();
};

module.exports = {
  isAuthenticated,
};
