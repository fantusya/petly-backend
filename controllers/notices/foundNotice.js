const { NotFound } = require("http-errors");
const { Notice } = require("../../models");

const foundNotice = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const foundNotice = await Notice.findOne({ _id: id, owner: _id });
  if (!foundNotice) {
    throw new NotFound(`Notice with id=${id} not found`);
  }
  res.json(foundNotice);
};

module.exports = foundNotice;
