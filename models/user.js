const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const nameRegexp = /[^a-zа-яё ]/; //eslint-disable-line
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
const passwordRegexp = /^\S+$/; //eslint-disable-line
const phoneRegexp =
  /^(?!\+.*\(.*\).*--.*$)(?!\+.*\(.*\).*-$)(\+[0-9]{2}\([0-9]{3}\)[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2})$/; //eslint-disable-line
// valid '+38(095)198-37-29'

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
      maxlength: 62,
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
      match: [phoneRegexp, "Please enter a valid phone number"],
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
    favoriteNotices: [{ type: Schema.Types.ObjectId, ref: "Notices" }],
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
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().min(7).max(62).pattern(passwordRegexp),
  name: Joi.string().pattern(nameRegexp),
  city: Joi.string(),
  phone: Joi.string().pattern(phoneRegexp),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string()
    // .pattern(passwordRegexp)
    .required(),
});

const User = model("users", userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
};
