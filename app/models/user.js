const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, require: true, unique: true },
    mobile: { type: String, require: true, unique: true },
    roles: { type: [String], default: ["USER"] },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, },
    skills: { type: [String], default: [] },
    teams: { type: [mongoose.Types.ObjectId], default: [] },
    token: {type : String , default : ""}
}, {
    Timestamps: true
});
const UserModel = mongoose.model("user", userSchema)
module.exports = {
    UserModel
}