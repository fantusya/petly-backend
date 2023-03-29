const { User } = require("../../models");
// const { Notice, User } = require("../../models");

const getFavorite = async (req, res) => {
  // const { favoriteNotices } = req.user;
  const { _id } = req.user;
  const { page = 1, limit = 12, search = "" } = req.query;
  const skip = (page - 1) * limit;

  // if (favoriteNotices.length === 0) {
  //   res.json({ favoriteNotices: [] });
  // }

  const user = await User.findOne({ _id }).populate({
    path: "favoriteNotices",
    match: { title: { $regex: search, $options: "i" } },
  });
  const totalItems = user.favoriteNotices.length;

  if (totalItems.length === 0) {
    res.json({ results: [] });
  }

  const { favoriteNotices } = await User.findOne({ _id }).populate({
    path: "favoriteNotices",
    match: { title: { $regex: search, $options: "i" } },
    options: {
      // select: "-createdAt -updatedAt",
      skip: Number(skip),
      limit: Number(limit),
    },
  });
  // const results = userNotices.favoriteNotices;

  const results = [...favoriteNotices].sort(
    (firstNotice, secondNotice) =>
      new Date(secondNotice.createdAt) - new Date(firstNotice.createdAt)
  );

  // const result = [];

  // for (const item of favoriteNotices) {
  //   try {
  //     const foundNotice = await Notice.findById({ _id: item });
  //     result.push(foundNotice);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  res.json({ results, totalItems });
};

module.exports = getFavorite;
