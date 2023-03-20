const { Notice } = require("../../models");

const getFavorite = async (req, res) => {
  const { favoriteNotices } = req.user;
  if (favoriteNotices.length === 0) {
    res.json({ message: "No favorite Notices" });
  }
  console.log("favoriteNotices", favoriteNotices);
  const result = [];

  for (const item of favoriteNotices) {
    try {
      const foundNotice = await Notice.findById({ _id: item });
      result.push(foundNotice);
    } catch (error) {
      console.log(error);
    }
  }
  res.json(result);
};

module.exports = getFavorite;
