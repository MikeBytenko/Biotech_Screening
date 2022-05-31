const passport = require("passport");
const permit = roles => {
  return (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(401).json({
          message: "User is not authenticated",
        });
      }
      req.user = user;
      const isAllowed = roles.some(role => user.roles.includes(role));
      if (isAllowed) {
        return next();
      }
      return res.status(403).json({ message: "You are not permitted" });
    })(req, res, next);
  };
};

module.exports = { permit };