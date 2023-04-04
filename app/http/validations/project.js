const { body } = require("express-validator");

function createProjectValidator() {

    return [
        body("title").notEmpty().withMessage("عنوان پروژه نمیتواند خالی باشد"),
        body("tags").isArray({min:0,max:10}).withMessage("تعداد تگ ها از صفر تا ده میباشد"),
        body("text").notEmpty().isLength({ min: 20 }).withMessage("توضیحات پروژه حداقل ۲۰ نویسه باید باشد")
    ]
}

module.exports = {
    createProjectValidator
}