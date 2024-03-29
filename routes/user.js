const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");
const auth = require("../middleware/auth");
const _ = require("lodash");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/:id", validateObjectId, async (req, res) => {
  const result = await User.findById(req.params.id);
  const user = _.pick(result, "username", "avatarUrl");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }
  let { password, email, username, avatarUrl } = req.body;

  const userInDB = await User.findOne({ email: req.body.email });
  if (userInDB) return res.status(400).send("Email already exists");

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    password: passwordHash,
    email,
    username,
    avatarUrl,
  });

  const result = await user.save();
  const { _id } = result;
  res.send({ _id, email, username });
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { email, username, password, avatarUrl } = req.body;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const user = {
    username,
    password: passwordHash,
    email,
    avatarUrl,
  };

  const result = await User.findByIdAndUpdate(req.params.id, user, {
    new: true,
  });
  res.send(result);
});

router.delete("/:id", auth, async (req, res) => {
  const result = await User.findByIdAndDelete(req.params.id);
  res.send(result);
});

module.exports = router;
