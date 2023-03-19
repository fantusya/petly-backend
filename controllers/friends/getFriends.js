const { Friend } = require("../../models/friend");

const getFriends = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const friends = await Friend.find({}, "", {
    skip,
    limit: Number(limit),
  });
  if (friends.length === 0) {
    res.json({
      results: "Sorry, there are no friends yet",
    });
  }

  res.json({
    results: friends,
    current_total: page * limit,
    total: friends.length,
  });
};

module.exports = getFriends;
