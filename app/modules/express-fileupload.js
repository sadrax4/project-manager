const fileUpload = require("express-fileupload");
const path = require("path");
const { createUploadPath } = require("./functions");

const uploadFile = async (req, res, next) => {
    if (req.file || Object.keys(req.files).length == 0) throw {
        status: 400, success: false, message: "لطفا یک نصویر را انتخاب کنید"
    };
    const image = req.files?.image;
    const image_path = path.join(createUploadPath(), image.name);
    req.body.image = image_path;
    const uploadPath = path.join(__dirname, "..", "..", image_path);
    image.mv(uploadPath, (error) => {
        if (error) throw {
            status: 500, success: false, message: " بارگذاری تصویر انجام نشد"
        };
        next();
    })
}
module.exports = {
    uploadFile
}