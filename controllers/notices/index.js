const add = require("./add");
const getUserNotices = require("./getUserNotices");
const getById = require("./getById");
const getByCategory = require("./getByCategory");
const removeById = require("./removeById");
const addToFavorites = require("./addToFavorites");
const getFavorite = require("./getFavorite");
const removeFromFavorites = require("./removeFromFavorites");

module.exports = {
  removeFromFavorites,
  getFavorite,
  addToFavorites,
  removeById,
  getByCategory,
  getById,
  getUserNotices,
  add,
};
