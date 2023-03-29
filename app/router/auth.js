const router = require('express').Router();
const { registerValidator,loginValidator } = require('../http/validations/auth');
const { expressValidatorMapper } = require('../http/middlawares/checkErrors');
const {AuthController} = require("./../http/controllers/auth.controller")
router.post("/register", registerValidator(),expressValidatorMapper,AuthController.register)
router.post("/login", loginValidator(),expressValidatorMapper,AuthController.login)
module.exports = {
    authRoutes: router
}