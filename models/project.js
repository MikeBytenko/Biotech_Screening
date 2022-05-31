const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dayjs = require("dayjs");

const today = dayjs().format("YYYY-MM-DD");

const ProjectSchema = new mongoose.Schema(
  {

    date: {
        type: Date,
        default: today
    },
    studyYear: {
      type: Number,
      required: true,
    },
    projectName: {
        type: String,
        required: true
    },
    notes: {
      type: String,
      required: true,
    },
    instruments: {
      type: String,
      requied: true,
    },
    abstract: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    owners: {
        type: Array,
        required: true
    }
  },
  { timestamps: true }
);

ProjectSchema.statiсs.format = project => {
  return {
    date: project.date,
    studyYear: project.studyYear,
    projectName: project.projectName,
    notes: project.notes,
    instruments: project.instruments,
    abstract: project.abstract,
    purpose: project.purpose,
    owners: project.owners
  }
};

module.exports = mongoose.model("Project", ProjectSchema)