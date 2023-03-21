const { Notice } = require("../../models");
const { uploadNoticeImage } = require("../../middlewares/cloudinary");
const { BadRequest } = require("http-errors");
const fs = require("fs/promises");

// https://github.com/okarynskyi/team-project-petly-frontend/blob/main/src/helpers/formatDate.js

const add = async (req, res) => {
  const { title, name, breed } = req.body;
  const { path: upload } = req.file;
  const { _id: owner } = req.user;

  const photoURL = await uploadNoticeImage(upload);
  fs.unlink(upload);

  const notice = await Notice.findOne({ title, name, breed });

  if (notice) {
    throw BadRequest("Notice already exist");
  }
  const newNotice = await Notice.create({
    ...req.body,
    owner,
    photoURL,
  });

  res.status(201).json(newNotice);
};

module.exports = add;
