const express = require("express");
const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
const { joiSchema } = require("../../models/notices");
const { noticesCtrls: ctrl } = require("../../controllers");

const router = express.Router();
router.get("/search/:search", ctrlWrapper(ctrl.getByKeyword));
// //////////
router.get("/category/:category", ctrlWrapper(ctrl.getByCategory));

router.get("/id/:id", ctrlWrapper(ctrl.getById));
router.post("/favorite/:id", auth, ctrlWrapper(ctrl.addToFavorites));
router.get("/favorite", auth, ctrlWrapper(ctrl.getFavorite));
router.delete("/favorite/:id", auth, ctrlWrapper(ctrl.removeFromFavorites));
router.post(
  "/",
  auth,
  validation(joiSchema),
  upload.single("photoURL"),
  ctrlWrapper(ctrl.add)
);
router.get("/", auth, ctrlWrapper(ctrl.getByUser));
router.delete("/id/:id", auth, ctrlWrapper(ctrl.removeById));

module.exports = router;
