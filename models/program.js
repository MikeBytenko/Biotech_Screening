const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProgramsSchema = new mongoose.Schema(
  {
    studyYear: {
      type: Number,
      required: true,
    },
    forGroups: {
        type: Array,
        required: true
    },
    titleOfCourse: {
      type: String,
      required: true,
    },
    professor: {
      type: String,
      requied: true,
    },
  },
  { timestamps: true }
);

ProgramsSchema.statiсs.format = program => {
  return {
    titleOfCourse: program.titleOfCourse,
    forGroups: program.forGroups
  }
};

module.exports = mongoose.model("Programs", ProgramsSchema)