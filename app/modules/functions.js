const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require('fs');
function hashingPassword(str) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt);
}
function tokenGenerator(payload) {
    const token = "Bearer " + (jwt.sign(payload, process.env.JWT_SECRET_KEY, ({ expiresIn: "100 days" })));
    return token;
}
function verifyJwtToken(token) {
    const result = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!result?.username) throw { status: 401, success: false, message: "لطفا وارد حساب کاربری خود شوید" }
    return result;
}
function createUploadPath() {
    const d = new Date();
    const year = "" + d.getFullYear();
    const month = "" + d.getMonth();
    const day = "" + d.getDate();
    const uploadPath = path.join(__dirname, "..", "..", "public", "uploads", year, month, day);
    fs.mkdirSync(uploadPath, { recursive: true });
    return path.join("public", "uploads", year, month, day);
}
function createLinkForFile(fileAddress,req) {
    return req.protocol + "://" + req.get("host") + "/" + fileAddress;
}
module.exports = {
    hashingPassword,
    tokenGenerator,
    verifyJwtToken,
    createUploadPath
}