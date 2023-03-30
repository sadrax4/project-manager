const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
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
    if (!result?.username) throw { status: 401, success: false, message:"لطفا وارد حساب کاربری خود شوید"}
    return result;
}
module.exports = {
    hashingPassword,
    tokenGenerator,verifyJwtToken
    
}