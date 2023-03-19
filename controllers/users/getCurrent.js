const { Pet } = require("../../models/pet");

const getCurrent = async (req, res) => {
  const user = req.user;

  const myPets = await Pet.find({ owner: user._id }).populate(
    "owner",
    "_id name email name city phone birthDate avatarURL token favoriteNotices"
  );

  res.json({
    user,
    myPets,
  });
};

module.exports = getCurrent;
