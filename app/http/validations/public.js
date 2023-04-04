const {  check } = require("express-validator");

function mongoIDValidator() {
    return [
        check("id").isMongoId().withMessage("ایدی وارد شده صحیح نمیباشد")
    ]
}
module.exports = {
    mongoIDValidator
}