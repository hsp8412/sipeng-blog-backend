const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-access-token");
  if (!token) return res.status(401).send("Access denied");
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.userId = decoded.id;
    next();
  } catch (e) {
    res.status(403).send("Invalid token");
  }
}

module.exports = auth;
