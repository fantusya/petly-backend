const express = require("express");
const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
const { joiSchema } = require("../../models/notices");
const { noticesCtrls: ctrl } = require("../../controllers");
// const { Notice } = require("../../models");

const router = express.Router();
/* створити ендпоінт для пошуку оголошеннь по заголовку */
router.get("/:search", ctrlWrapper(ctrl.getByKeyword));
/* створити ендпоінт для отримання оголошень по категоріям */
router.get("/:category", ctrlWrapper(ctrl.getByCategory));
/* створити ендпоінт для отримання одного оголошення */
router.get("/:id", ctrlWrapper(ctrl.getById));
/* створити ендпоінт для додавання оголошення до обраних */
router.post("/favorite/:id", auth, ctrlWrapper(ctrl.addToFavorites));
/* створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані */
router.get("/favorite", auth, ctrlWrapper(ctrl.getFavorite));
/* створити ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних */
router.delete("/favorite/:id", auth, ctrlWrapper(ctrl.removeFromFavorites));
/* створити ендпоінт для додавання оголошень відповідно до обраної категорії */
router.post(
  "/",
  validation(joiSchema),
  upload.single("photoURL"),
  ctrlWrapper(ctrl.add)
);

/* створити ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем */
router.get("/", auth, ctrlWrapper(ctrl.getByUser));

/* створити ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем */
router.delete("/notice/:id", auth, ctrlWrapper(ctrl.removeById));

module.exports = router;
