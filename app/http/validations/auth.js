const { body } = require('express-validator');
const { UserModel } = require('../../models/user');
function registerValidator() {
    return [
        body("username").custom(async (value, ctx) => {
            if (value) {
                const usernameRegex = /[a-z]+[a-z0-9\_\.]{3,}/gi
                if (usernameRegex.test(value)) {
                    const usernameExist = await UserModel.findOne({ username: value });
                    if (usernameExist) throw "نام کاربری تکراری میباشد";
                    return true;
                }
                throw "نام کاربری صحیح نمیباشد"
            } else {
                throw "نام کاربری خالی میباشد"
            }
        }),
        body("email").isEmail().withMessage("ایمیل وارد شده صحیح نمیباشد ")
            .custom(async email => {
                const emailExist = await UserModel.findOne({ email });
                if (emailExist) throw "ایمیل وارد شده تکراری میباشد";
            }),
        body("mobile").isMobilePhone("fa-IR").withMessage("شماره موبایل وارد شده صحیح نمیباشد")
            .custom(async mobile => {
                const mobileExist = await UserModel.findOne({mobile});
                if(mobileExist) throw "شماره موبایل وارد شده تکراری میباشد";
            }),
        body("password").custom((value, ctx) => {
            if (!value) throw "رمز عبور نمیتواند خالی باشد";
            if (value !== ctx?.req?.body?.confirmPassword) throw "رمز عبور با رمز تکرار شده برابر نیست"
            return true;
        })
    ]
}
module.exports = {
    registerValidator
}