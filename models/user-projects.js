const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dayjs = require("dayjs");

const today = dayjs().format("YYYY-MM-DD");

const UserProjectsSchema = new mongoose.Schema({
  ProjectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  date: { type: Date, default: today },
});

module.exports = mongoose.model("UserProjects", UserProjectsSchema);