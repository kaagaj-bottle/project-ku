const mongoose = require("mongoose");

const actionLogSchema = mongoose.Schema({
  actionContent: String,
  actionSubject: String,
  actionDoer: String,
  date: Date,
});

actionLogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("ActionLog", actionLogSchema);
