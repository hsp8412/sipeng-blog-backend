const express = require("express");
const cors = require("cors");
const user = require("../routes/user");
const post = require("../routes/post");
const auth = require("../routes/auth");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api/user", user);
  app.use("/api/post", post);
  app.use("/api/auth", auth);
};
