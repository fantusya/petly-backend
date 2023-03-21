const { Schema, model } = require("mongoose");
const Joi = require("joi");

const lettersRegexp = /[^a-zа-яё ]/;

const petSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      minlength: 2,
      maxlength: 16,
      match: [lettersRegexp, "Use only letters."],
    },
    breed: {
      type: String,
      required: [true, "Breed is required."],
      minlength: 2,
      maxlength: 16,
      match: [lettersRegexp, "Use only letters."],
    },
    photoURL: {
      type: String,
      required: [true, "Photo of the pet is required."],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    comments: {
      type: String,
      minlength: 8,
      maxlength: 120,
      required: [true, "Please write something about your pet."],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const joiPetSchema = Joi.object({
  name: Joi.string().min(2).max(16).pattern(lettersRegexp),
  breed: Joi.string().min(2).max(16).pattern(lettersRegexp),
  avatarUrl: Joi.string(),
  date: Joi.date(),
  comments: Joi.string().min(2).max(16),
});

const Pet = model("pets", petSchema);

module.exports = {
  Pet,
  joiPetSchema,
};
