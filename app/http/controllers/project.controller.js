const autoBind = require("auto-bind");
const { ProjectModel } = require("../../models/project");
const { createLinkForFile } = require("../../modules/functions")
class ProjectController {
    constructor() {
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
    async updateProject(req, res, next) {
        try {
            const projectID = req.params.id || undefined;
            const owner = req.user._id || undefined;
            const data = { ...req.body };
            await this.findProject(owner, projectID);
            Object.entries(data).forEach(([key, value]) => {
                if (!["text", "title", "tags"].includes(key)) delete data[key];
                if (["", " ", NaN, undefined, null, 0, -1].includes(value)) delete data[key];
            });
            const updateProjectResult = await ProjectModel.updateOne({ _id: projectID }, { $set: data });
            if (updateProjectResult.modifiedCount == 0) throw {
                status: 400, success: false, message: "به روز رسانی انجام نشد !"
            }
            return res.status(200).json({
                status: 200,
                success: true,
                message: "به روز رسانی با موفقیت انجام شد"
            })
        } catch (error) {
            next(error);
        }
    }
    async updateProjectImage(req, res, next) {
        try {
            let image = req.body.image;
            image = createLinkForFile(image,req);
            const owner = req.user._id;
            const projectID = req.params.id;
            await this.findProject(owner, projectID);
            const updateResult = await ProjectModel.updateOne({ _id: projectID }, { $set: { image } });
            if (updateResult.modifiedCount == 0) throw {
                status: 400, success: false, message: "به روز رسانی انجام نشد !"
            }
            return res.status(200).json({
                status: 200,
                success: true,
                message: "به روز رسانی با موفقیت انجام شد"
            })
        } catch (error) {
            next(error);
        }
    }
    getAllProjectOfTeam() {

    }
    getProjectOfUser() {

    }
}
module.exports = { ProjectController: new ProjectController() }
