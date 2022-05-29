const express = require("express");
const { Post, validatePost } = require("../models/post");
const auth = require("../middleware/auth");
const router = express.Router();

//get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

//get post by id
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).send("The post does not exist.");
  res.send(post);
});

//create new post
router.post("/", auth, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, preview, content, userId, coverImg, tags } = req.body;

  const post = {
    title,
    preview,
    content,
    userId,
    coverImg,
    tags,
    createDate: Date.now(),
    updateDate: Date.now(),
  };
  try {
    await post.save();
  } catch (e) {
    return res.status(500).send("Internal error");
  }
  res.send(post);
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    return res.send(post);
  } catch (e) {
    return res.status(400).send("Bad request");
  }
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  const postInDb = await Post.findById(req.params.id);
  if (!postInDb) return res.status(400).send("Post not found.");

  const { title, preview, content, userId, coverImg, tags } = req.body;
  const updatedPost = {
    title,
    preview,
    content,
    userId,
    coverImg,
    tags,
    createDate: postInDb.createdDate,
    updateDate: Date.now(),
  };

  try {
    const result = await Post.findByIdAndUpdate(req.params.id, updatedPost, {
      new: true,
    });
    res.send(result);
  } catch (e) {
    res.status(500).send("Internal error");
  }
});

module.exports = router;
