const { NotFound } = require("http-errors");
const { Notice } = require("../../models");

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const findNotice = await Notice.findOne({ _id: id, owner: _id });
  if (!findNotice) {
    throw new NotFound(`Contact with id=${id} not found`);
  } else res.json(findNotice);
};

module.exports = { getById };
