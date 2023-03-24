const { Notice } = require("../../models");

const getUserNotices = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, search = "" } = req.query;
  const skip = (page - 1) * limit;

  const totalItems = await Notice.find({
    owner: _id,
    title: { $regex: search, $options: "i" },
  }).count();
  console.log("totalItems", totalItems);

  if (!totalItems) {
    res.json({ results: [] });
  }

  const results = await Notice.find(
    { owner: _id, title: { $regex: search, $options: "i" } },
    "-createdAt -updatedAt",
    { skip, limit: Number(limit) }
  )
    .populate("owner", "_id name email")
    .sort({ createdAt: "descending" });

  res.json({ results, totalItems });
};

module.exports = getUserNotices;
