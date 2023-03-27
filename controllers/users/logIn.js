const dotenv = require("dotenv");
dotenv.config();

const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  // const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "2m" });
  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "1d" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  // await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    accessToken,
    refreshToken,
  });
  const { name, phone, birthDate, city, avatarURL, _id } = updatedUser;

  res.json({
    accessToken,
    refreshToken,
    user: {
      _id,
      email,
      name,
      phone,
      birthDate,
      city,
      avatarURL,
    },
  });
};

module.exports = logIn;
