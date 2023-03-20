const { Notice } = require("../../models");

const getByKeyWord = async (req, res) => {
  const { search: query } = req.params;
  const searchResult = await Notice.find({ title: query });
  if (searchResult.length === 0) {
    res.json({
      results: "Sorry, there is no result by your query",
    });
  }

  // сортировка объявлений в порядке спадания (b перед a) - новые первее

  const notices = [...searchResult].sort(
    (firstNotice, secondNotice) =>
      new Date(secondNotice.createdAt) - new Date(firstNotice.createdAt)
  );

  res.json(notices);
};

module.exports = getByKeyWord;
