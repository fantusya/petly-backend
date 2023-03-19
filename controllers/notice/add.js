const { Notice } = require("../../models");

const add = async (req, res) => {
  const { _id } = req.user;
  const newNotice = await Notice.create({ ...req.body, owner: _id });
  res.status(201).json(newNotice);
};

module.exports = { add };
