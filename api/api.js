const userRouter = require("./user/user");
const notesRouter = require("./notes/image")
const programsRouter = require('./programs/programs')
const projectsRouter = require('./projects/projects')
const userProgramsRouter = require('./user-program/user-program')

module.exports = {userRouter, notesRouter, programsRouter, projectsRouter, userProgramsRouter};