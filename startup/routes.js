const express = require("express");
const cors = require("cors");
const user = require("../routes/user");
const post = require("../routes/post");
const auth = require("../routes/auth");
const image = require("../routes/image");
const error = require("../middleware/error");

module.exports = function (app) {
  app.get("/", function (req, res, next) {
    res.status(200).send("Hi, It works!");
  });
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api/user", user);
  app.use("/api/post", post);
  app.use("/api/auth", auth);
  app.use("/api/image", image);
  app.use(error);
};
