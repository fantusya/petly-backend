const { NotFound } = require("http-errors");
const { Notice } = require("../../models");

const foundNotice = async (req, res) => {
  console.log(req.user);
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const foundNotice = await Notice.find(
    { owner: _id },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(limit),
    }
  ).populate("owner", "_id name email");
  if (!foundNotice) {
    throw new NotFound(`You have no any added notices`);
  }
  res.json(foundNotice);
};

module.exports = foundNotice;
