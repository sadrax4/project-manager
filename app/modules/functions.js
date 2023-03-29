const bcrypt = require('bcrypt');
const jwt = require ("jsonwebtoken");
function hashingPassword(str) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str,salt);
}
function tokenGenerator(payload){
    const token = "Bearer "+(jwt.sign(payload,process.env.JWT_SECRET_KEY,({expiresIn:"100 days"})));
    return token;
}
module.exports = {
    hashingPassword,
    tokenGenerator
}