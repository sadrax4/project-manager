const { UserModel } = require('../../models/user');
const { hashingPassword, tokenGenerator } = require('../../modules/functions');
const bcrypt = require("bcrypt");
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

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (!user) throw { status: 401, success: false, message: "نام کاربری یا رمز عبور اشتباه میباشد" };
      const compareResult = bcrypt.compareSync(password, user.password);
      if (!compareResult) throw { status: 401, success: false, message: "نام کاربری یا رمز عبور اشتباه میباشد" };
      const token = tokenGenerator({ username });
      user.token = token;
      user.save();
      return res.status(200).setHeader("autorization", `${token}`).json({
        status: 200,
        success: true,
        message: "شما با موفقیت وارد شدید",
        token
      });
    } catch (error) {
      next(error);
    }
  }

  resetpassword() {

  }

}
module.exports = { AuthController: new AuthController() };