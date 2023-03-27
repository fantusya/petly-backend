const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const { Forbidden } = require("http-errors");
const { User } = require("../../models");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const refreshToken = async (req, res) => {
  const { refreshToken: token } = req.body;
  console.log("refreshToken", refreshToken);
  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY);

    const isExist = await User.findOne({ refreshToken: token });
    if (!isExist) {
      throw new Forbidden("Token invalid");
    }

    const payload = { id };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "1d",
    });
    // const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    //   expiresIn: "2m",
    // });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    throw new Forbidden("Token invalid");
  }
};

module.exports = refreshToken;
