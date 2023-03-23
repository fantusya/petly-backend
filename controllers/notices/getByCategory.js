const { NotFound } = require("http-errors");
const { Notice } = require("../../models");

const getByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Notice.find({ category }, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");

  if (result.length === 0 || !category) {
    throw new NotFound(`There is no notices in this category`);
  }

  const notices = [...result].sort(
    (firstNotice, secondNotice) =>
      new Date(secondNotice.createdAt) - new Date(firstNotice.createdAt)
  );

  res.json(notices);
};

module.exports = getByCategory;
