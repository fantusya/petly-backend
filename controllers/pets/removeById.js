const { Pet } = require("../../models");
const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
  const { petId } = req.params;
  const { _id } = req.user;

  const result = await Pet.findOneAndRemove({
    _id: petId,
    owner: _id,
  });
  if (!result) {
    throw new NotFound(`Not found`);
  }

  res.json({
    message: "Contact deleted",
  });
};

module.exports = removeById;
