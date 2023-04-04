const router = require('express').Router();
const { ProjectController } = require("../http/controllers/project.controller");
const checkLogin = require('../http/middlawares/autoLogin');
const { expressValidatorMapper } = require('../http/middlawares/checkErrors');
const { createProjectValidator } = require('../http/validations/project');
const { mongoIDValidator } = require('../http/validations/public');
const { uploadFile } = require('../modules/express-fileupload');
const fileUpload = require("express-fileupload")

router.post("/create", fileUpload(), checkLogin, uploadFile, createProjectValidator(), expressValidatorMapper, ProjectController.createProject);
router.get("/list", checkLogin, ProjectController.getAllProject);
router.delete("/remove/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.removeProject);
router.get("/edit/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.updateProject);
router.put("/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.getProjectById);
router.patch("/update-projectImage/:id", fileUpload(), checkLogin, uploadFile, mongoIDValidator(), expressValidatorMapper, ProjectController.updateProjectImage);
module.exports = {
    projectRoutes: router
}