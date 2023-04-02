const router = require('express').Router();
const { ProjectController } = require("../http/controllers/project.controller");
const checkLogin = require('../http/middlawares/autoLogin');
const { expressValidatorMapper } = require('../http/middlawares/checkErrors');
const { createProjectValidator } = require('../http/validations/project');
const { uploadFile } = require('../modules/express-fileupload');
const fileUpload = require("express-fileupload")

router.post("/create", fileUpload(), checkLogin, uploadFile, createProjectValidator(), expressValidatorMapper, ProjectController.createProject);

module.exports = {
    projectRoutes: router
}