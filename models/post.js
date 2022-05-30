const joi = require("joi");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: [mongoose.Types.ObjectId],
    required: true,
  },
  coverImg: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  createDate: {
    type: Date,
    required: true,
  },
  updateDate: {
    type: Date,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema, "post");

function validatePost(post) {
  const schema = joi
    .object({
      title: joi.string().max(1000).required(),
      preview: joi.string().max(1000000).required(),
      content: joi.string().max(1000000).required(),
      coverImg: joi.string().required().max(2048),
      tags: joi.array().items(joi.string().max(25)),
      userId: joi.string().max(24).required(),
    })
    .unknown();
  return schema.validate(post);
}

module.exports.Post = Post;
module.exports.validatePost = validatePost;
