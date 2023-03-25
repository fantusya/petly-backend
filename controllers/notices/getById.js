const { NotFound } = require("http-errors");
const { Notice } = require("../../models");

const getById = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const foundNotice = await Notice.findOne(
    { _id: id },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(limit),
    }
  ).populate("owner", "_id email phone");
  if (!foundNotice) {
    throw new NotFound(`Notice with id=${id} not found`);
  }
  res.json(foundNotice);
};

module.exports = getById;
