const { NotFound } = require("http-errors");
const { Notice } = require("../../models");
const { User } = require("../../models");

const removeById = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;

  await User.findOneAndUpdate(
    { _id: _id },
    { $pull: { favoriteNotices: id } },
    {
      new: true,
    }
  );

  const deletedNotice = await Notice.findOneAndRemove({
    _id: id,
  });

  if (!deletedNotice) {
    throw new NotFound(`Notice with id=${id} not found`);
  }
  res.json(deletedNotice);
};

module.exports = removeById;
