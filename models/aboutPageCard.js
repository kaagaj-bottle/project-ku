const mongoose = require("mongoose");

const aboutPageCardSchema = mongoose.Schema({
  heading: String,
  caption: String,
  additionalText: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

aboutPageCardSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("AboutPageCard", aboutPageCardSchema);
