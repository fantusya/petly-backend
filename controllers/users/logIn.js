const dotenv = require("dotenv");
dotenv.config();

const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  // console.log("hello")

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1w" });

  const updatedUser = await User.findByIdAndUpdate(user._id, { token });
  const { name, phone, birthDate, city, avatarURL } = updatedUser;

  res.json({
    token,
    user: {
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
