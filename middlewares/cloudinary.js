const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
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

const uploadAvatarImage = async (pathFile) => {
  const options = {
    folder: "userAvatars",
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    transformation: [
      { gravity: "face", height: 233, width: 233, crop: "fill" },
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
      { height: 240, width: 240, gravity: "face", crop: "fill" },
    ],
  };
  try {
    const result = await cloudinary.uploader.upload(pathFile, options);
    return result.url;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { uploadNoticeImage, uploadPetsImage, uploadAvatarImage };
