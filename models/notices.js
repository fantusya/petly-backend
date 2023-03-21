const Joi = require("joi");
const { Schema, model } = require("mongoose");

const noticeSchema = Schema(
  {
    category: {
      type: String,
      enum: ["sell", "lost-found", "for-free"],
      default: "sell",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: 2,
      maxLength: 48,
      text: true,
    },
    name: {
      type: String,
      minLength: 2,
      maxLength: 16,
      required: [true, "Name is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    breed: {
      type: String,
      minLength: 2,
      maxLength: 24,
      required: [true, "Breed is required"],
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please, select a sex of your pet"],
    },
    location: {
      type: String,
      required: [true, "Please, select a location"],
    },
    price: {
      type: Number,
      min: 0.01,
    },
    photoURL: {
      type: String,
      // required: [true, "Please, add an image to your notice"],
    },
    comments: {
      type: String,
      required: [true, "Please, add some comments to your notice"],
      minLength: 8,
      maxLength: 120,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const joiSchema = Joi.object({
  category: Joi.string().valid("sell", "lost-found", "for-free"),
  title: Joi.string().min(2).max(48),
  name: Joi.string().min(2).max(16),
  breed: Joi.string().min(2).max(24),
  sex: Joi.string().valid("male", "female"),
  date: Joi.date(),
  location: Joi.string(),
  price: Joi.number().min(0.01),
  comments: Joi.string().min(8).max(120),
  photoURL: Joi.string(),
});

const Notice = model("notice", noticeSchema);

module.exports = {
  Notice,
  joiSchema,
};
