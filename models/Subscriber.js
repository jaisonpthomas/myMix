const mongoose = require("mongoose");
const Joi = require("joi");

const subscriberSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 255
  },
  phone: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  }
});

const validator = subscriber => {
  const schema = {
    firstName: Joi.string()
      .min(1)
      .max(255)
      .required(),
    lastName: Joi.string()
      .min(1)
      .max(255)
      .required(),
    email: Joi.string()
      .min(1)
      .max(255)
      .required(),
    phone: Joi.string()
      .min(1)
      .max(255)
      .required()
  };
  return Joi.validate(subscriber, schema);
};

exports.Subscriber = mongoose.model("subscriber", subscriberSchema);
exports.validator = validator;
