const express = require("express");

const { petsCtrls: ctrl } = require("../../controllers");
const { auth, validation, ctrlWrapper, upload } = require("../../middlewares");
const { joiPetSchema } = require("../../models/pet");

const router = express.Router();

router.post(
  "/",
  auth,
  validation(joiPetSchema),
  upload.single("photoURL"),
  ctrlWrapper(ctrl.add)
);

router.delete("/:petId", auth, ctrlWrapper(ctrl.removeById));

module.exports = router;
