const bcrypt = require('bcrypt');
function hashingPassword(str) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str,salt);
}

module.exports = {
    hashingPassword
}