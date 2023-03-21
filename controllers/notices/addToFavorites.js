const { NotFound, BadRequest } = require("http-errors");
const { User } = require("../../models");

const addToFavorites = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;

  if (!id) {
    throw new NotFound(`Notice with id=${id} not found`);
  }

  const updatedFavoriteNotices = await User.findOneAndUpdate(
    { _id: _id },
    { $push: { favoriteNotices: id } },
    {
      new: true,
    }
  );
  if (!updatedFavoriteNotices) {
    throw new BadRequest(`Notice is not added to favorite`);
  }
  res.json(updatedFavoriteNotices);
};

module.exports = addToFavorites;
