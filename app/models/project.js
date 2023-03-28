const mongoose = require('mongoose');
const ProjectSchema = mongoose.Schema({
    title: {type : String , required:true},
    text: {type : String },
    image:  {type : String , default:"/defaults/defualt.png"},
    owner: {type : mongoose.Types.ObjectId,required:true},
    team: {type : [mongoose.Types.ObjectId]},
    private : {type : Boolean,default:true}
},{
    Timestamps:true
});
const ProjectModel = mongoose.model("project",ProjectSchema)
module.exports = {
    ProjectModel
}
