const joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema, "user");

function validateUser(user) {
  const schema = joi
    .object({
      email: joi.string().email().required(),
      username: joi.string().max(100).required(),
      password: joi.string().max(1000).required(),
      avatarUrl: joi.string().max(2048).required(),
    })
    .unknown();
  return schema.validate(user);
}

function validateLogin(credential) {
  const schema = joi
    .object({
      email: joi.string().email().required(),
      password: joi.string().max(1000).required(),
    })
    .unknown();
  return schema.validate(credential);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.validateLogin = validateLogin;
