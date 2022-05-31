const mongoose = require('mongoose')
const NotesSchema = require('./notes').schema
const UserProgramsSchema = require('./user-programs')
const UserProjectsSchema = require('./user-projects')

const UserSchema = new mongoose.Schema(
    {

    email: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    sex: {
        type: String,
        required: false
    },
    isFrom: { // Университет, компания, фирма
        type: String,
        required: true
    }, 
    programs: [UserProgramsSchema],
    projects: [UserProjectsSchema],
    notes: [NotesSchema]

}, 
    {timestamps: true}
);

UserSchema.static.format = user => {
    return {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        position: user.status,
        age: user.age,
        sex: user.sex,
        isFrom: user.isFrom,
        programs: user.programs,
        projects: user.projects,
        notes: user.notes
    };
};

module.exports = mongoose.model("User", UserSchema)