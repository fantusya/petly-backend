const { News } = require("../../models/news");
const { NotFound } = require("http-errors");

const getNews = async (req, res) => {
  const news = await News.find();
  if (news.length === 0) {
    throw new NotFound("Sorry, there is no news");
  }
  res.status(200).json({ results: news, total: news.length });
};

module.exports = getNews;
