const express = require("express");
const { ctrlWrapper } = require("../../middlewares");
const { friends: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getFriends));

module.exports = router;
