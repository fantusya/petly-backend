const { City } = require("../../models");

const getCities = async (req, res) => {
  const { query = "" } = req.query;

  const city = await City.find(
    { city: { $regex: query, $options: "i" } },
    "-_id -id"
  );

  if (!city) {
    res.json({ results: "Sorry, city not found" });
  }

  res.json(city);
};

module.exports = getCities;
