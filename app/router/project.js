const router = require('express').Router();
const { ProjectController } = require("../http/controllers/project.controller");
const checkLogin = require('../http/middlawares/autoLogin');
const { expressValidatorMapper } = require('../http/middlawares/checkErrors');
const { createProjectValidator } = require('../http/validations/project');
const { mongoIDValidator } = require('../http/validations/public');
const { uploadFile } = require('../modules/express-fileupload');
const fileUpload = require("express-fileupload")

router.post("/create", fileUpload(), checkLogin, uploadFile, createProjectValidator(), expressValidatorMapper, ProjectController.createProject);
router.post("/list", checkLogin, ProjectController.getAllProject);
router.post("/remove/:id", checkLogin, mongoIDValidator, expressValidatorMapper, ProjectController.removeProject);
router.post("/edit/:id", checkLogin, mongoIDValidator, expressValidatorMapper, ProjectController.updateProject);
router.post("/:id", checkLogin, mongoIDValidator, expressValidatorMapper, ProjectController.getProjectById);

module.exports = {
    projectRoutes: router
}