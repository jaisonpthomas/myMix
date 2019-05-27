const mongoose = require("mongoose");
const Joi = require("joi");
const { artistSchema } = require("./Artist");

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  artist: {
    type: artistSchema,
    required: true
  },
  genre: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  copiesAvailable: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
});

const validator = album => {
  const schema = {
    title: Joi.string()
      .min(1)
      .max(255)
      .required(),
    artistId: Joi.string().required(),
    genre: Joi.string()
      .min(1)
      .max(255)
      .required(),
    copiesAvailable: Joi.number()
      .min(0)
      .required()
  };
  return Joi.validate(album, schema);
};

exports.Album = mongoose.model("album", albumSchema);
exports.validator = validator;
