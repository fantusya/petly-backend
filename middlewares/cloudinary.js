const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadNoticeImage = async (pathFile) => {
  const options = {
    folder: "noticeImages",
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    transformation: [
      { height: 288, width: 280, gravity: "face", crop: "fill" },
    ],
  };
  try {
    const result = await cloudinary.uploader.upload(pathFile, options);
    return result.url;
  } catch (error) {
    console.error(error);
  }
};

const uploadPetsImage = async (pathFile) => {
  const options = {
    folder: "petsImages",
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    transformation: [
      { height: 161, width: 161, gravity: "face", crop: "fill" },
      { radius: "20" },
    ],
  };
  try {
    const result = await cloudinary.uploader.upload(pathFile, options);
    return result.url;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { uploadNoticeImage, uploadPetsImage };
