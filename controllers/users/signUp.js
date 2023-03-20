const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
// const gravatar = require("gravatar");

const signUp = async (req, res) => {
  const { name, email, password, city, phone } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`${email} in use`);
  }
  // const avatarURL = gravatar.url(email);
  const newUser = new User({ name, email, city, phone, avatarURL: null });
  newUser.setPassword(password);
  await newUser.save();

  res.status(201).json({
    message: "You have been successfully registered",
  });
};

module.exports = signUp;
