const { NotFound } = require("http-errors");
const { Notice } = require("../../models");

const getByKeyword = async (req, res) => {
  const { search: query } = req.params;

  const result = await Notice.find({ $text: { $search: query } });

  if (result.length === 0) {
    throw new NotFound(`There is no notices by your query`);
  }

  const notices = [...result].sort(
    (firstNotice, secondNotice) =>
      new Date(secondNotice.createdAt) - new Date(firstNotice.createdAt)
  );
  res.json(notices);
};

module.exports = getByKeyword;
