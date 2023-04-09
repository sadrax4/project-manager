const autoBind = require("auto-bind");
const { TeamModel } = require("../../models/team");
const { UserModel } = require("../../models/user");

class TeamController {
    constructor() {
        autoBind(this);
    }
    async createTeam(req, res, next) {
        try {
            const { name, description, username } = req.body;
            const owner = req.user._id;
            const createResult = await TeamModel.create({ owner, name, description, username });
            if (!createResult) throw {
                status: 500, success: false, message: "ایجاد تیم  انجام نشد !"
            }
            return res.status(201).json({
                status: 201, success: true, message: " تیم با موفقیت ساخته شد"
            })
        } catch (error) {
            next(error);
        }
    }
    async getAllTeam(req, res, next) {
        try {
            const teams = await TeamModel.find({});
            if (!teams) throw "متاسفانه تیمی یافت نشد !";
            return res.status(200).json({
                status: 200, success: true, teams
            })
        } catch (error) {
            next(error);
        }
    }
    async getTeamById(req, res, next) {
        try {
            const teamID = req.params.id;
            const team = await TeamModel.findById({ _id: teamID });
            if (!team) throw {
                status: 404, succes: false, message: "متاسفانه تیمی یافت نشد!"
            };
            return res.status(200).json({
                status: 200, success: true, team
            });
        } catch (error) {
            next(error);
        }
    }
    async geyMyTeams(req, res, next) {
        try {
            const userID = req.user._id;
            const teams = await TeamModel.find({
                $or: [
                    { owner: userID },
                    { users: userID }
                ]
            })
            if (!teams) throw {
                status: 404, succes: false, message: "متاسفانه تیمی یافت نشد!"
            };
            return res.status(200).json({
                status: 200, success: true, teams
            });
        } catch (error) {
            next(error);
        }
    }
    async removeTeamById(req, res, next) {
        const teamID = req.params.id;
        const team = await TeamModel.findById({ _id: teamID });
        if (!team) throw {
            status: 404, succes: false, message: "متاسفانه تیمی یافت نشد!"
        };
        const removeResult = await TeamModel.deleteOne({ _id: teamID });
        if (removeResult.deletedCount == 0) throw {
            status: 500, success: false, message: "متاسفانه فرایند حذف با مشکل مواجه شد"
        }
        return res.status(200).json({
            status: 200, success: true, message: "تیم مورد نظر با موفقیت حذف شد"
        });
    }
    async findUserInTeam(userID, teamID) {
        const result = await TeamModel.find({
            $or: [{
                owner: userID,
                users: userID
            }],
            _id: teamID
        })
        return !!result;
    }

    async inviteUserToTeam(req, res, next) {
        try {
            const userID = req.user._id;
            const { username, teamID } = req.params;
            const team = this.findUserInTeam(userID, teamID);
            if (!team) throw {
                status: 400, success: false, message: "تیمی جهت دعوت کردن یافت نشد"
            };
            const user = await UserModel.findOne({ username });
            console.log(user)
            if (!user) throw { status: 400, success: false, message: "کاربر مورد نظر جهت دعوت کردن یافت نشد" };
            const userInvited = await this.findUserInTeam(user._id, teamID);
            if (!userInvited) throw {
                status: 400, success: false, message: " کاربر مورد نظر قبلا به تیم دعوت شده است"
            };
            const request = {
                caller: req.user.username,
                reqeustData: new Date(),
                teamID,
                status: "pending"
            }
            const updateUserResult = await UserModel.updateOne({ username }, {
                $push: { inviteRequest: request }
            })
            if (updateUserResult.modifiedCount == 0) throw {
                status: 400, success: false, message: "درخواست دعوت ثبت نشد"
            }
            return res.status(200).json({
                status: 200, success: true, message: "ثبت درخواست با موفقیت ایجاد شد"
            })
        } catch (error) {
            next(error);
        }
    }
    async getRequest(req, res, next) {
        try {
            const userID = req.user._id;
            const { inviteRequest } = await UserModel.findById({ _id: userID }, { inviteRequest: 1 });
            return res.status(200).json({
                requests: inviteRequest || []
            })
        } catch (error) {
            next(error);
        }
    }
    removeteamById() {

    }
    updateTeam() {

    }
}
module.exports = { TeamController: new TeamController() }