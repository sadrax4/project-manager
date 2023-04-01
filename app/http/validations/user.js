const { body } = require("express-validator");
const path = require("path");

function profileImageValidator() {
    return [
        body("image").custom((value, { req }) => {
            if (Object.keys(req.file).length === 0) throw {
                status: 400, success: false, message: "یک تصویر انتخاب کنید"
            };
            const ext = path.extname(req.file?.originalname);
            const exts = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".ico"];
            if (!(exts.includes(ext))) throw {
                status: 400, success: false, message: "فرمت تصویر ارسال شده صحیح نمیباشد"
            }
            const maxSize = (process.env.MAX_PROFILE_SIZE * 1024 * 1024);
            if (req.file.size > maxSize) throw {
                status: 400, success: false, message: "حجم فایل نمیتواند بیشتر ۳ مگابایت باشد"
            }
            return true;
        })
    ]
}
module.exports = {
    profileImageValidator
}