const mongoose = require('mongoose');
const TeamSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    username: { type: String, unique: true },
    users: { type: [mongoose.Types.ObjectId], default: [] },
    owner: { type: mongoose.Types.ObjectId, require: true }
}, {
    Timestamps: true
});
const TeamModel = mongoose.model("team", TeamSchema)
module.exports = {
    TeamModel
}
