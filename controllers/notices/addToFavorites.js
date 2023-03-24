const { NotFound, Conflict } = require("http-errors");
const { User, Notice } = require("../../models");

const addToFavorites = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  if (!id) {
    throw new NotFound(`Notice with id=${id} not found`);
  }

  const user = await User.findById({ _id });
  const inFavorites = user.favoriteNotices.includes(id);
  if (inFavorites) {
    throw new Conflict(
      `Notice with id: ${id} has been already added to favorites`
    );
  }

  await User.findOneAndUpdate(
    { _id },
    { $push: { favoriteNotices: id } },
    { new: true }
  ).populate("favoriteNotices", "-createdAt -updatedAt");

  const newFavorite = await Notice.findById({ _id: id });

  res.json(newFavorite);
};

module.exports = addToFavorites;
