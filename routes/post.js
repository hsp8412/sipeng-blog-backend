const express = require("express");
const { Post, validatePost } = require("../models/post");
const auth = require("../middleware/auth");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");

//get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

//get post by id
router.get("/:id", validateObjectId, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).send("The post does not exist.");
  res.send(post);
});

//create new post
router.post("/", auth, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, preview, content, userId, coverImg, tags } = req.body;

  const post = new Post({
    title,
    preview,
    content,
    userId,
    coverImg,
    tags,
    createDate: Date.now(),
    updateDate: Date.now(),
  });

  await post.save();

  res.send(post);
});

router.delete("/:id", [auth, validateObjectId], async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  return res.send(post);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validatePost(req.body);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  const postInDb = await Post.findById(req.params.id);
  if (!postInDb) return res.status(400).send("Post not found.");

  console.log(postInDb);

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

  const result = await Post.findByIdAndUpdate(req.params.id, updatedPost, {
    new: true,
  });
  res.send(result);
});

module.exports = router;
