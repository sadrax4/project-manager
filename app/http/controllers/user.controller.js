const { UserModel } = require("../../models/user");

class UserController {
    getProfile(req, res, next) {
        try {
            let user = req.user;
            user.profile_image = req.protocol + "://"+ req.get('host') +"/"+ user.profile_image;
            return res.status(200).json({
                status: 200,
                success: true,
                user
            })
        } catch (error) {
            next(error);
        }
    }
    async editProfile(req, res, next) {
        const isEmpty = require("is-empty");
        try {
            let data = { ...req.body };
            const userID = req.user._id;
            const fields = ["first_name", "last_name", "skills"];
            const badValues = ["", " ", null, NaN, undefined, -1, 0, {}, []];
            Object.entries(data).forEach(([key, value]) => {
                if (!fields.includes(key)) delete data[key];
                if (badValues.includes(value)) delete data[key];
                if (isEmpty(value)) delete data[key];
            });
            const result = await UserModel.updateOne({ _id: userID }, { $set: data });
            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "به روز رسانی پروفایل  با موفقیت انجام شد"
                })
            }
            throw { status: 400, success: false, message: "به روز رسانی انجام نشد" };
        } catch (error) {
            next(error);
        }
    }
    async uploadProfileImage(req, res, next) {
        try {
            const userID = req.user?._id;
            if (Object.keys(req.file).length == 0) throw {
                status: 400, success: false, message: "یک تصویر انتخاب کنید"
            };
            const filePath = req.file?.path.split("public/")[1];
            const result = await UserModel.updateOne({ _id: userID }, { $set: { profile_image: filePath } });
            if (result.modifiedCount == 0) throw {
                status: 400, success: false, message: "به روز رسانی انجام نشد"
            };
            return res.status(200).json({
                status: 200, success: true, message: "به روز رسانی با موفقیت انجام شد"
            })
        } catch (error) {
            next(error);
        }
    }
    addSkills() {

    }
    editSkills() {

    }
    acceptInviteInTeam() {

    }
    rejectInviteInTeam() {

    }
}
module.exports = { UserController: new UserController() };