const { Pet } = require("../../models");
const { uploadPetsImage } = require("../../middlewares/cloudinary");
const fs = require("fs/promises");

const add = async (req, res) => {
  const { _id } = req.user;
  const { path: upload } = req.file;
  const photoURL = await uploadPetsImage(upload);
  fs.unlink(upload);

  const result = await Pet.create({ ...req.body, photoURL, owner: _id });

  res.status(201).json(result);
};

module.exports = add;
