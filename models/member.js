const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  username: String,
  name: String,
  faculty: String,
  post: String,
  isRootMember: Boolean,
  passwordHash: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

memberSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("Member", memberSchema);
