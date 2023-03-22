const express = require("express");
const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiEditInfoSchema,
  joiRefreshTokenSchema,
} = require("../../models/user");
const { usersCtrls: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiRegisterSchema), ctrlWrapper(ctrl.signUp));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.logIn));
router.post(
  "/refresh",
  validation(joiRefreshTokenSchema),
  ctrlWrapper(ctrl.refreshToken)
);
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logOut));
router.patch(
  "/edit",
  auth,
  validation(joiEditInfoSchema),
  ctrlWrapper(ctrl.editInfo)
);

router.put(
  "/avatars",
  auth,
  upload.single("avatarURL"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
