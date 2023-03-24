const { Notice } = require("../../models");
const { uploadNoticeImage } = require("../../middlewares/cloudinary");
const { BadRequest } = require("http-errors");
const fs = require("fs/promises");

const add = async (req, res) => {
  const { title, name, breed } = req.body;
  const { path: upload } = req.file;
  const { _id: owner } = req.user;

  const photoURL = await uploadNoticeImage(upload);
  fs.unlink(upload);

  const notice = await Notice.findOne({ title, name, breed });
  if (notice) {
    throw BadRequest("Such notice is already exist");
  }

  await Notice.create({
    ...req.body,
    owner,
    photoURL,
  });

  res.status(201).json({ message: "successfully created" });
};

module.exports = add;
