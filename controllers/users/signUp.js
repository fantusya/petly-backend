const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const signUp = async (req, res) => {
  const { name, email, password, city, phone } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`${email} in use`);
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ name, email, avatarURL, city, phone });
  newUser.setPassword(password);
  await newUser.save();

  res.status(201).json({
    name,
    email,
    avatarURL,
    city,
    phone,
  });
};

module.exports = signUp;
