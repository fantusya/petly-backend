const { Notice } = require("../../models");
const { uploadNoticeImage } = require("../../middlewares/cloudinary");
const fs = require("fs/promises");

const add = async (req, res) => {
  // let { birthDate } = req.body;
  // birthDate = new Date(birthDate.replace(/(\d+).(\d+).(\d+)/, "$3/$2/$1"));

  // const parsedDate = Date.parse(birthDate);

  const { path: upload } = req.file;
  // const { _id: owner } = req.user;

  const photoURL = await uploadNoticeImage(upload);
  fs.unlink(upload);

  const newNotice = await Notice.create({
    ...req.body,
    // owner,
    photoURL,
  });

  res.status(201).json(newNotice);
};

module.exports = add;
