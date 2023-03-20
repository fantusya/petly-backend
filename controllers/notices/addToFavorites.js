const { NotFound, BadRequest } = require("http-errors");
const { Notice } = require("../../models");

const addToFavorites = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const { favorite } = req.body;
  if (!favorite) {
    throw new BadRequest(`Field favorite is required`);
  }
  const updatedNotice = await Notice.findOneAndUpdate(
    { _id: id, owner: _id },
    { favorite },
    {
      new: true,
    }
  );
  if (!updatedNotice) {
    throw new NotFound(`Notice with id=${id} not found`);
  }
  res.json(updatedNotice);
};

module.exports = addToFavorites;
