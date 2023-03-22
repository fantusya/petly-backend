const { City } = require("../../models");

const getCities = async (req, res) => {
  const { search: query } = req.params;

  const city = await City.findOne({ city: query });
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
