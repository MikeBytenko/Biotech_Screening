const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImagesSchema = new mongoose.Schema(
  {
    note: {
      type: Schema.Types.ObjectId,
      ref: "Notes",

      required: true,
    },
    image: {
      type: String,
      requied: false,
    },
  },
  { timestamps: true }
);

ImagesSchema.statics.format = images => {
  return {
    note: images.image
  };
};

module.exports = mongoose.model("Images", ImagesSchema);