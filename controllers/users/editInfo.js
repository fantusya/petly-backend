const { User } = require("../../models");

const editInfo = async (req, res) => {
  const user = req.user;
  const body = req.body;
  await User.findByIdAndUpdate(user.id, body);
  res.json(user);
};

module.exports = editInfo;
