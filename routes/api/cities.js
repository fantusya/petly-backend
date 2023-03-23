const express = require("express");
const { ctrlWrapper } = require("../../middlewares");
const { citiesCtrls: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getCities));

module.exports = router;
