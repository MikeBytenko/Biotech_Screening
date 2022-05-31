const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dayjs = require("dayjs");

const today = dayjs().format("YYYY-MM-DD");

const UserProgramsSchema = new mongoose.Schema({
  programId: {
    type: Schema.Types.ObjectId,
    ref: "Programs",
    required: true,
  },
  date: { type: Date, default: today },

});

module.exports = mongoose.model("UserPrograms", UserProgramsSchema);