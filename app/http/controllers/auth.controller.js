const { UserModel } = require('../../models/user');
const { hashingPassword } = require('../../modules/functions');
class AuthController {
  async register(req, res, next) {
    try {
      const { username, mobile, email, password } = req.body;
      const hash_password = hashingPassword(password);
      const user = await UserModel.create({
        username, email, password: hash_password, mobile
      })
      return res.json({
        message: req.body
      })
    } catch (error) {
      next(error)
    }
  }

  login() {

  }

  resetpassword() {

  }

}
module.exports = { AuthController: new AuthController() };