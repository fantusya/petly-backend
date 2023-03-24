const { Notice } = require("../../models");

const getByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 10, search = "" } = req.query;
  const skip = (page - 1) * limit;

  const totalItems = await Notice.find({
    category,
    title: { $regex: search, $options: "i" },
  }).count();

  if (!totalItems) {
    res.json({ results: [] });
  }

  const notices = await Notice.find(
    { category, title: { $regex: search, $options: "i" } },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(limit),
    }
  ).populate("owner", "_id name email");

  const results = [...notices].sort(
    (firstNotice, secondNotice) =>
      new Date(secondNotice.createdAt) - new Date(firstNotice.createdAt)
  );

  res.json({ totalItems, results });
};

module.exports = getByCategory;
