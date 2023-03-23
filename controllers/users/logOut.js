const { User } = require("../../models/user");

const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { accessToken: null, refreshToken: null });
  res.status(204).json();
};

module.exports = logOut;
