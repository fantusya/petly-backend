const { User } = require("../../models/user");
const { uploadAvatarImage } = require("../../middlewares/cloudinary");
const fs = require("fs/promises");

const updateAvatar = async (req, res) => {
  const { path: upload } = req.file;
  const { _id } = req.user;

  const photoURL = await uploadAvatarImage(upload);

  const updatedUser = await User.findByIdAndUpdate(
    { _id },
    {
      avatarURL: photoURL,
    },
    { new: true }
  );

  res.json({ avatarURL: updatedUser.avatarURL });
  fs.unlink(upload);
};

module.exports = updateAvatar;
