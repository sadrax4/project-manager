const checkLogin = require('../http/middlawares/autoLogin');
const { TeamController } = require("../http/controllers/team.controller");
const { createTeamValidator } = require('../http/validations/team');
const { expressValidatorMapper } = require('../http/middlawares/checkErrors');
const { mongoIDValidator } = require('../http/validations/public');
const router = require('express').Router();

router.post("/create", checkLogin, createTeamValidator(), expressValidatorMapper, TeamController.createTeam)
router.get("/list", checkLogin, TeamController.getAllTeam);
router.get("/me", checkLogin, TeamController.geyMyTeams);
router.get("/invite/:teamID/:username", checkLogin, expressValidatorMapper, TeamController.inviteUserToTeam);
router.get("/myRequest", checkLogin, expressValidatorMapper, TeamController.getRequest);
router.get("/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, TeamController.getTeamById);
router.delete("/remove/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, TeamController.removeTeamById);

module.exports = {
    teamRoutes: router
}