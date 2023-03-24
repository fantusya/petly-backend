const { City } = require("../../models");

const getCities = async (req, res) => {
  // const { search: query } = req.params;
  const { query } = req.body;

  const city = await City.find({ $text: { $search: query } }, "-_id -id", {});
  if (!city) {
    res.json({
      results: "Sorry, city not found",
    });
  }
  res.json({
    city,
  });
};

module.exports = getCities;
