const { City } = require("../../models");

const getCities = async (req, res) => {
  const { query = "" } = req.query;
  // const regexp = `/^${query}/`;
  // console.log(regexp);

  const city = await City.find(
    { cityEn: { $regex: query, $options: "i" } },
    "stateEn cityEn countyEn useCounty"
  );

  // console.log("city", city);
  // console.log(city.map((item) => console.log("item", item.city)));

  if (!city) {
    res.json({ results: "Sorry, city not found" });
  }

  res.json(city);
};

module.exports = getCities;
