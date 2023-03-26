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
      unique: true,
      minlength: 6,
      maxLength: 63,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      match: [passwordRegexp, "Password can't contain white spaces"],
      minlength: 7,
      maxLength: 32,
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      match: [nameRegexp, "Name must be only Arabic letters"],
      minlength: 2,
      maxLength: 25,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      minlength: 2,
      maxLength: 50,
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
  email: Joi.string()
    .email({ tlds: { deny: ["ru"] } })
    .error(
      (errors) =>
        new Error("enter valid email: min 6, max 63 characters, except .ru")
    )
    .min(6)
    .max(63)
    .required(),
  password: Joi.string().pattern(passwordRegexp).min(7).max(32).required(),
  name: Joi.string().pattern(nameRegexp).min(2).max(25).required(),
  city: Joi.string().min(2).max(50).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { deny: ["ru"] } })
    .error(
      (errors) =>
        new Error("enter valid email: min 6, max 63 characters, except .ru")
    )
    .min(6)
    .max(63)
    .required(),
  password: Joi.string().pattern(passwordRegexp).min(7).max(32).required(),
});

const joiEditInfoSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { deny: ["ru"] } })
    .error(
      (errors) =>
        new Error("enter valid email: min 6, max 63 characters, except .ru")
    )
    .min(6)
    .max(63),
  birthDate: Joi.date(),
  name: Joi.string().pattern(nameRegexp).min(2).max(25),
  city: Joi.string().min(2).max(50),
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
