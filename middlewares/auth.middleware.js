const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  var token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    if (token.startsWith("Bearer")) {
      token = token.split(" ")[1];
    }
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token.");
  }
  return next();
};

module.exports = verifyToken;
