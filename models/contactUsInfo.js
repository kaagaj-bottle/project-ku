const mongoose = require("mongoose");

const contactUsInfoSchema = mongoose.Schema({
  facebookLink: String,
  instagramLink: String,
  twitterLink: String,
  email: String,
});

contactUsInfoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("ContactUsInfo", contactUsInfoSchema);
