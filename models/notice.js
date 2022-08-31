const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: String,
  date: Date,
  pdfLink: String,
});

noticeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Notice", noticeSchema);
