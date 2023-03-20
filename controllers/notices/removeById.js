const { NotFound } = require("http-errors");
const { Notice } = require("../../models");

const removeById = async (req, res) => {
  const { id } = req.params;
  const deletedNotice = await Notice.findOneAndRemove({
    _id: id,
  });
  if (!deletedNotice) {
    throw new NotFound(`Notice with id=${id} not found`);
  }
  res.json(deletedNotice);
};

module.exports = removeById;
