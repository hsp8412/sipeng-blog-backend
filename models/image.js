const joi = require("joi");
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model("Image", imageSchema, "image");

function validateImage(image) {
  const schema = joi
    .object({
      imageUrl: joi.string().max(2048).required(),
      name: joi.string().max(200).required(),
      description: joi.string().max(1000).required(),
    })
    .unknown();
  return schema.validate(image);
}

module.exports.Image = Image;
module.exports.validateImage = validateImage;
