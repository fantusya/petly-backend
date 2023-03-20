const { NotFound } = require("http-errors");
const { Notice } = require("../../models");

const getByUser = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const notices = await Notice.find({ owner: _id }, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  if (notices.length === 0) {
    throw new NotFound(`You have no any added notices`);
  }
  res.json(notices);
};

module.exports = getByUser;
