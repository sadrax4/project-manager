const autoBind = require("auto-bind");
const { ProjectModel } = require("../../models/project");

class ProjectController {
    constructor(){
        autoBind(this)
    }
    async findProject(owner, projectID) {
        const project = await ProjectModel.find({ owner, _id: projectID });
        if (!project) throw {
            status: 404, success: false, message: "پروژه ای یافت نشد"
        };
        return project;
    }
    async createProject(req, res, next) {
        try {
            const { owner, title, text, image, tags } = req.body;
            const result = await ProjectModel.create({ title, text, owner, image, tags });
            if (!result) throw {
                status: 400, success: false, message: "افزودن پروژه با مشکل مواجه شد"
            };
            return res.status(201).json({
                status: 201, success: true, message: "پروژه با موفقیت ایجاد شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllProject(req, res, next) {
        try {
            const userID = req.user._id;
            const projects = await ProjectModel.find({ owner: userID });
            if (!projects) throw {
                status: 400, success: false, message: "متاسفانه پروژه ای یافت نشد"
            };
            return res.status(200).json({
                status: 200,
                success: true,
                projects
            })
        } catch (error) {
            next(error);
        }
    }
    async getProjectById(req, res, next) {
        try {
            const projectID = req.params.id;
            const owner = req.user._id;
            const project = await this.findProject(owner, projectID);
            return res.status(200).json({
                status: 200,
                success: true,
                project
            })
        } catch (error) {
            next(error);
        }
    }
    async removeProject(req, res, next) {
        try {
            const projectID = req.params.id;
            const owner = req.user._id;
            await this.findProject(owner, projectID);
            const deleteProjectResult = await ProjectModel.deleteOne({ _id: projectID });
            if (deleteProjectResult.deletedCount == 0) throw {
                status: 400, success: false, message: "پروژه حذف نشد"
            }
            return res.status(200).json({
                status: 200,
                success: true,
                message: "پروژه با موفقیت حدف شد"
            })
        } catch (error) {
            next(error);
        }
    }
    getAllProjectOfTeam() {

    }
    getProjectOfUser() {

    }
    updateProject() {

    }
}
module.exports = { ProjectController: new ProjectController() }
