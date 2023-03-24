const express = require("express");
const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
const { joiAddNoticeSchema } = require("../../models/notices");
const { noticesCtrls: ctrl } = require("../../controllers");

const router = express.Router();
//
router.get("/category/:category", ctrlWrapper(ctrl.getByCategory)); // OK

router.get("/id/:id", ctrlWrapper(ctrl.getById));

router.delete("/id/:id", auth, ctrlWrapper(ctrl.removeById));

router.get("/favorite", auth, ctrlWrapper(ctrl.getFavorite)); // OK

router.post("/favorite/:id", auth, ctrlWrapper(ctrl.addToFavorites));

router.delete("/favorite/:id", auth, ctrlWrapper(ctrl.removeFromFavorites));

router.post(
  "/",
  auth,
  upload.single("photoURL"),
  validation(joiAddNoticeSchema),
  ctrlWrapper(ctrl.add)
); // OK

router.get("/", auth, ctrlWrapper(ctrl.getUserNotices)); // OK

module.exports = router;
