const { Pet } = require("../../models");
const { uploadPetsImage } = require("../../middlewares/cloudinary");
const fs = require("fs/promises");

const add = async (req, res) => {
  const { path: upload } = req.file;
  const { _id: owner } = req.user;

  const photoURL = await uploadPetsImage(upload);
  fs.unlink(upload);

  const newPet = await Pet.create({
    ...req.body,
    owner,
    photoURL,
  });

  res.status(201).json(newPet);
};

module.exports = add;
