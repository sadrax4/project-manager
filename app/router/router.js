const router = require('express').Router();

const {projectRoutes} = require('./project.js') 
const {authRoutes} = require('./auth.js')
const {teamRoutes} = require('./team.js')
const {userRoutes} = require('./user.js')

router.use("/project",projectRoutes);
router.use("/auth",authRoutes);
router.use("/teamRouter",teamRoutes);
router.use("/userRouter",userRoutes);
module.exports = {
    allRoutes: router
}