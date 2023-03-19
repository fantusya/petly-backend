const express = require("express");
const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
// const { joiSchema } = require("../../models/user");
// const { users: ctrl } = require("../../controllers");

const router = express.Router();
//створити ендпоінт для пошуку оголошеннь по заголовку
//створити ендпоінт для отримання оголошень по категоріям

//створити ендпоінт для отримання одного оголошення
router.get("/:id", isValidId, asyncWrapper(ctrl.getById));

//створити ендпоінт для додавання оголошення до обраних
//створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані
//створити ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних
//створити ендпоінт для додавання оголошень відповідно до обраної категорії
//створити ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем
//створити ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем
router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signUp));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.logIn));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logOut));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
