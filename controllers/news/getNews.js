const { News } = require("../../models/news");

const getNews = async (req, res) => {
  const news = await News.find({});
  if (news.length === 0) {
    res.json({
      results: "Sorry, there is no news yet",
    });
  }

  res.json(news);
  // const { page = 1, limit = 10 } = req.query;
  // const skip = (page - 1) * limit;

  // const news = await News.find({}, "", {
  //   skip,
  //   limit: Number(limit),
  // });
  // if (news.length === 0) {
  //   res.json({
  //     results: "Sorry, there is no news yet",
  //   });
  // }

  // res.json({
  //   results: news,
  //   current_total: page * limit,
  //   total: news.length,
  // });
};

module.exports = getNews;
