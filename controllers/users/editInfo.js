const { User } = require("../../models");

const editInfo = async (req, res) => {
  const { _id: id } = req.user;
  const body = req.body;
  await User.findByIdAndUpdate(id, body);
  res.json(body);
};

module.exports = editInfo;
