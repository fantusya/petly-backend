const { Pet } = require("../../models/pet");

const getCurrent = async (req, res) => {
  const { _id, name, email, city, phone, birthDate, avatarURL } = req.user;

  const myPets = await Pet.find(
    { owner: _id },
    "-createdAt -updatedAt"
  ).populate("owner", "_id name email");

  res.json({
    name,
    email,
    city,
    phone,
    birthDate,
    avatarURL,
    myPets,
  });
};

module.exports = getCurrent;
