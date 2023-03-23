const add = require("./add");
const getByUser = require("./getByUser");
const getById = require("./getById");
const getByCategory = require("./getByCategory");
const removeById = require("./removeById");
const getByKeyword = require("./getByKeyword");
const addToFavorites = require("./addToFavorites");
const getFavorite = require("./getFavorite");
const removeFromFavorites = require("./removeFromFavorites");
module.exports = {
  removeFromFavorites,
  getFavorite,
  addToFavorites,
  getByKeyword,
  removeById,
  getByCategory,
  getById,
  getByUser,
  add,
};
