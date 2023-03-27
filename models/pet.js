const { Schema, model } = require("mongoose");
const Joi = require("joi");

const lettersRegex =
  /^[a-zA-Zа-яА-ЯіІїЇґҐщЩьЬЄє'\s]*[a-zA-Zа-яА-ЯіІїЇґҐщЩьЬЄє'][a-zA-Zа-яА-ЯіІїЇґҐщЩьЬЄє'\s]*$/;

const petSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      minlength: 2,
      maxlength: 16,
      match: [lettersRegex, "Use only letters."],
    },
    breed: {
      type: String,
      required: [true, "Breed is required."],
      minlength: 2,
      maxlength: 24,
      match: [lettersRegex, "Use only letters."],
    },
    photoURL: {
      type: String,
      default: null,
      // required: [true, "Photo of the pet is required."],
    },
    birthDate: {
      type: Date,
      required: [true, "Date of birth of the pet is required."],
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

const joiPetAddSchema = Joi.object({
  name: Joi.string().min(2).max(16).pattern(lettersRegex).required(),
  breed: Joi.string().min(2).max(24).pattern(lettersRegex).required(),
  photoURL: Joi.string(),
  birthDate: Joi.date().required(),
  comments: Joi.string().min(8).max(120).required(),
});

const Pet = model("pets", petSchema);

module.exports = {
  Pet,
  joiPetAddSchema,
};
