const express = require("express");
const { Image, validateImage } = require("../models/image");
const { Post, validatePost } = require("../models/post");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  const images = await Image.find();
  res.send(images);
});

router.post("/", async (req, res) => {
  const { error } = validateImage(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { imageUrl, name, description } = req.body;

  const image = new Image({
    imageUrl,
    name,
    description,
  });

  await image.save();

  res.send(image);
});

module.exports = router;
