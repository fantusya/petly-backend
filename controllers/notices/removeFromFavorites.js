const { NotFound } = require("http-errors");
const { User } = require("../../models");

const removeFromFavorites = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;

  const removeFavortie = await User.findOneAndUpdate(
    { _id: _id },
    { $pull: { favoriteNotices: id } },
    {
      new: true,
    }
  );
  if (!removeFavortie) {
    throw new NotFound(`Notice with id=${id} not found`);
  }
  res.json(removeFavortie);
};

module.exports = removeFromFavorites;
