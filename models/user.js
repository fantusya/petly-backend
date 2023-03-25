const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const nameRegexp =
  /^[a-zA-Zа-яА-ЯіІїЇґҐ\s]*[a-zA-Zа-яА-ЯіІїЇґҐ][a-zA-Zа-яА-ЯіІїЇґҐ\s]*$/;
const emailRegexp =
  /^(?=.{1,63}$)(?=.{2,}@)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // eslint-disable-line
const passwordRegexp = /^\S+$/;
const phoneRegexp = /^\+380\d{9}$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: [true, "Email is required"],
      match: [emailRegexp, "Please enter a valid email"],
      minLength: 12,
      maxLength: 50,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      match: [passwordRegexp, "Password can't contain white spaces"],
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      match: [nameRegexp, "Name must be only Arabic letters"],
    },

    city: {
      type: String,
      required: [true, "City is required"],
    },

    phone: {
      type: String,
      required: [true, "PhoneNumber is required"],
      match: [phoneRegexp, "Please enter a valid phone number"],
    },

    birthDate: {
      type: Date,
      default: null,
    },

    avatarURL: {
      type: String,
      default: null,
    },

    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },

    favoriteNotices: [{ type: Schema.Types.ObjectId, ref: "notice" }],
  },

  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiRegisterSchema = Joi.object({
  email: Joi.string().min(12).max(50).pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).required(),
  name: Joi.string().pattern(nameRegexp).required(),
  city: Joi.string().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string()
    // .pattern(passwordRegexp)
    .required(),
});

const joiEditInfoSchema = Joi.object({
  email: Joi.string().min(12).max(50).pattern(emailRegexp),
  birthDate: Joi.date(),
  name: Joi.string().pattern(nameRegexp),
  city: Joi.string(),
  phone: Joi.string().pattern(phoneRegexp),
});

const joiRefreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiEditInfoSchema,
  joiRefreshTokenSchema,
};
