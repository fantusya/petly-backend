const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const nameRegexp = /[^a-zа-яё ]/; //eslint-disable-line
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
const passwordRegexp = / ^(?!.* ).{7,32}$/; //eslint-disable-line
const phoneRegexp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/; //eslint-disable-line

const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: [true, "Email is required"],
      match: [emailRegexp, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 7,
      maxlength: 32,
      match: [
        passwordRegexp,
        "Password must be 7 to 32 characters and doesn't contain white spaces",
      ],
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
      match: [phoneRegexp, "Please enter a valid phone number"], // valid '+(38)095-198-37-29'
    },

    birthDate: {
      type: Date,
      default: Date.now,
    },

    avatarURL: {
      type: String,
    },

    token: {
      type: String,
      default: null,
    },
    favoriteNotices: [{ type: Schema.Types.ObjectId, ref: "Notice" }],
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
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).max(32).pattern(passwordRegexp).required(),
  name: Joi.string().pattern(nameRegexp).required(),
  city: Joi.string().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).required(),
});

const User = model("users", userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
};
