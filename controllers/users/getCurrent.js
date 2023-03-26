const { Pet } = require("../../models");
const { User } = require("../../models");

const getCurrent = async (req, res) => {
  const { _id, name, email, city, phone, birthDate, avatarURL } = req.user;

  const myPets = await Pet.find(
    { owner: _id },
    "-createdAt -updatedAt"
  ).populate("owner", "_id name email");

  const { favoriteNotices: favorites } = await User.findOne(
    { _id },
    "favoriteNotices"
  );

  res.json({
    name,
    email,
    city,
    phone,
    birthDate,
    avatarURL,
    myPets,
    favorites,
  });
};

module.exports = getCurrent;
