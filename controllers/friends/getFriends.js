const { Friend } = require("../../models/friend");
const { NotFound } = require("http-errors");

const getFriends = async (req, res) => {
  const friends = await Friend.find();
  if (friends.length === 0) {
    throw new NotFound("Sorry, there are no friends yet");
  }
  res.status(200).json({ results: friends, total: friends.length });
};

module.exports = getFriends;
