const multer = require("multer");
const path = require("path");

const tmpDir = path.resolve("tmp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("file", file);
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
  // limits: {
  //   fileSize: 2048 (3145728),
  // },
});

module.exports = upload;
