const auth = require("./auth");
const ctrlWrapper = require("./ctrlWrapper");
const isValidId = require("./isValidId");
const upload = require("./upload");
const validation = require("./validation");
const cloudinary = require("./cloudinary");
const passport = require("./googleAuth");

module.exports = {
  auth,
  ctrlWrapper,
  isValidId,
  upload,
  validation,
  cloudinary,
  passport,
};
