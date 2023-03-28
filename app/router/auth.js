const router = require('express').Router();
const { registerValidator } = require('../http/validations/auth');
const { expressValidatorMapper } = require('../http/middlawares/checkErrors');
const {AuthController} = require("./../http/controllers/auth.controller")
router.post("/register", registerValidator(),expressValidatorMapper,AuthController.register)
module.exports = {
    authRoutes: router
}