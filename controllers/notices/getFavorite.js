const { NotFound } = require("http-errors");
const { Notice } = require("../../models");

const getFavorite = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filters = { owner: _id };

  if (favorite) filters.favorite = favorite;

  if (filters.favorite) {
    const notices = await Notice.find(filters, "-createdAt -updatedAt", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email");
    if (notices.length === 0) {
      throw new NotFound(`Favorite notices not found`);
    } else {
      res.json(notices);
    }
  }
};

module.exports = getFavorite;
