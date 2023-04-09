const mongoose = require('mongoose');

const inviteRequestSchema = mongoose.Schema({
    teamID: { type: mongoose.Types.ObjectId, required: true },
    caller: { type: String, required: true, lowercase: true },
    requestDate: { type: Date, default: new Date() },
    status: { type: String, default: "pending" } // pending , accepted , rejected
})
const userSchema = mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, require: true, unique: true },
    mobile: { type: String, require: true, unique: true },
    roles: { type: [String], default: ["USER"] },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, },
    profile_image: { type: [String], default: [], require: false },
    skills: { type: [String], default: [] },
    teams: { type: [mongoose.Types.ObjectId], default: [] },
    token: { type: String, default: "" },
    inviteRequest: { type: [inviteRequestSchema] }
}, {
    Timestamps: true
});
const UserModel = mongoose.model("user", userSchema)
module.exports = {
    UserModel
}