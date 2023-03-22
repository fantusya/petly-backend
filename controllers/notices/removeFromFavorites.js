const { NotFound } = require("http-errors");
const { User } = require("../../models");

const removeFromFavorites = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;

  const favoriteToRemove = await User.findOneAndUpdate(
    { _id },
    { $pull: { favoriteNotices: id } },
    {
      new: true,
    }
  );
  if (!favoriteToRemove) {
    throw new NotFound(`Notice with id=${id} not found`);
  }

  res.json(favoriteToRemove);
};

module.exports = removeFromFavorites;
