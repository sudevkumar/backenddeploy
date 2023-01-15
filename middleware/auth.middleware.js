const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
  const token = req.headers.auth;

  if (token) {
    const decoded = jwt.verify(token, process.env.key);

    if (decoded) {
      const userId = decoded.userId;
      console.log(decoded);
      req.body.userId = userId;
      next();
    } else {
      res.send("Please Login first");
    }
  } else {
    res.send("Please Login first");
  }
};

module.exports = { auth };
