const express = require("express");

const { petsCtrls: ctrl } = require("../../controllers");
const { auth, validation, ctrlWrapper, upload } = require("../../middlewares");
const { joiPetAddSchema } = require("../../models/pet");

const router = express.Router();

router.post(
  "/",
  auth,
  upload.single("photoURL"),
  validation(joiPetAddSchema),
  ctrlWrapper(ctrl.add)
);

router.delete("/:petId", auth, ctrlWrapper(ctrl.removeById));

module.exports = router;
