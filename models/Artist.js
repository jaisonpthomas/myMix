const mongoose = require("mongoose");
const Joi = require("joi");

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  }
});

const validateArtistName = artist => {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(255)
      .required()
  };
  return Joi.validate(artist, schema);
};

exports.Artist = mongoose.model("artist", artistSchema);
exports.validator = validateArtistName;
