const { NotFound } = require("http-errors");
const { Notice } = require("../../models");

const removeById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const deletedNotice = await Notice.findOneAndRemove({
    _id: id,
    owner: _id,
  });
  if (!deletedNotice) {
    throw new NotFound(`Notice with id=${id} not found`);
  }
  res.json(deletedNotice);
};

module.exports = removeById;
