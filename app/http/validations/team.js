const { body } = require("express-validator");
const { TeamModel } = require("../../models/team");

function createTeamValidator() {
    return [
        body("name").isLength({ min: 5 }).withMessage("نام تیم نمیتواند کمتر از ۳ نویسه باشد"),
        body("description").notEmpty().withMessage("توضیحات تیم نمیتواند خالی باشد"),
        body("username").custom(async (username) => {
            const usernameRegex = /^[a-z]+[a-z0-9\_\.]{3,}$/gim
            if (usernameRegex.test(usernameRegex)) {
                const team = await TeamModel.findOne({ username });
                if (team) throw "نام کاربری قبلا توسط تیم دیکری استفاده شده است";
                return true;
            }
        })
    ]
}
module.exports = {
    createTeamValidator
}