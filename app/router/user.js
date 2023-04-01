const { UserController } = require('../http/controllers/user.controller');
const checkLogin = require('../http/middlawares/autoLogin');
const { profileImageValidator } = require('../http/validations/user');
const { upload_multer } = require('../modules/multer');
const { expressValidatorMapper } = require("../http/middlawares/checkErrors")
const router = require('express').Router();
router.get("/profile", checkLogin, UserController.getProfile);
router.post("/profile", checkLogin, UserController.editProfile);
router.post("/profile-image", upload_multer.single("image"), profileImageValidator(), expressValidatorMapper, checkLogin, UserController.uploadProfileImage);

module.exports = {
    userRoutes: router
}