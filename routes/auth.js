const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { User, validateLogin } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validLogin = await bcrypt.compare(req.body.password, user.password);
  if (!validLogin) return res.status(400).send("Invalid email or password");

  const payload = _.pick(user, ["email", "username", "_id"]);

  const accessToken = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "10h",
  });

  res.send({ id: user._id, accessToken });
});

module.exports = router;
