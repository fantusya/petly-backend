const { City } = require("../../models");
const { DB_HOST } = process.env;

const { MongoClient } = require("mongodb");
const client = new MongoClient(DB_HOST);

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
  // const result = await await client.db().test.city.createIndex({ city: 1 });
  // console.log(`Index created: ${result}`);
}
listDatabases(client);

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
