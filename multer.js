const multer = require("multer");
const path = require("path");

const Storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "uploads");
  },
  filename: (request, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: Storage });

module.exports = { upload };
