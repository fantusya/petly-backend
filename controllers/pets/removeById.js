const { Pet } = require("../../models");
const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
  const { petId } = req.params;
  const { _id } = req.user;

  const deletedPet = await Pet.findOneAndRemove({
    _id: petId,
    owner: _id,
  });
  if (!deletedPet) {
    throw new NotFound(`Not found`);
  }

  res.json(deletedPet);
};

module.exports = removeById;
