const { UserModel } = require("../../models/user");
const { verifyJwtToken } = require("../../modules/functions");

const checkLogin = async (req, res, next) => {
    try {
        const authError = { status: 401, success: false, message: "لطفا وارد حساب کاربری خود شوید" };
        const authorization = req?.headers?.authorization;
        if (!authorization) throw authError;
        let token = authorization.split(" ")[1];
        if (!token) throw authError;
        const result = verifyJwtToken(token);
        const { username } = result;
        const user = await UserModel.findOne({ username }, { password: 0 });
       // console.log(user);
        //console.log(username)
        if (!user) throw authError;
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}
 module.exports = checkLogin;