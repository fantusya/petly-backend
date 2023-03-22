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
    birthDate: {
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

const joiAddNoticeSchema = Joi.object({
  category: Joi.string().valid("sell", "lost-found", "for-free").required(),
  title: Joi.string().min(2).max(48).required(),
  name: Joi.string().min(2).max(16).required(),
  breed: Joi.string().min(2).max(24).required(),
  sex: Joi.string().valid("male", "female").required(),
  birthDate: Joi.date().required(),
  location: Joi.string().required(),
  price: Joi.number().min(0.01).required(),
  comments: Joi.string().min(8).max(120).required(),
  photoURL: Joi.string(),
});

const Notice = model("notice", noticeSchema);

module.exports = {
  Notice,
  joiAddNoticeSchema,
};
