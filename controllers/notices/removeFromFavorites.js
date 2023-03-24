const { NotFound, Conflict } = require("http-errors");
const { User } = require("../../models");

const removeFromFavorites = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;

  if (!id) {
    throw new NotFound(`Notice with id=${id} not found`);
  }

  const user = await User.findById({ _id });
  const inFavorites = user.favoriteNotices.includes(id);
  if (!inFavorites) {
    throw new Conflict(`Notice with id: ${id} not in favorites`);
  }

  const favoriteToRemove = await User.findOneAndUpdate(
    { _id },
    { $pull: { favoriteNotices: id } },
    {
      new: true,
    }
  ).populate("favoriteNotices", "_id title breed");
  if (!favoriteToRemove) {
    throw new NotFound(`Notice with id=${id} not found`);
  }

  res.json({ result: id });
};

module.exports = removeFromFavorites;
