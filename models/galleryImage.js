const mongoose = require("mongoose");

const galleryImageSchema = mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
  caption: String,
});

galleryImageSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("GalleryImage", galleryImageSchema);
