const { param } = require("express-validator");

function mongoIDValidator() {
    return [
        param("id").isMongoId().withMessage("ایدی وارد شده صحیح نمیباشد")
    ]
}
module.exports = {
    mongoIDValidator
}