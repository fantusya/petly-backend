const express = require("express");
const { ctrlWrapper } = require("../../middlewares");
const { newsCtrls: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getNews));

module.exports = router;
