const mongoose = require("mongoose");

const actionLogSchema = mongoose.Schema({
  header: String,
  captions: String,
  additionalText: String,
});

actionLogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("AboutPageCard", aboutPageCardSchema);
