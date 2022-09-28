const galleryImagesRouter = require("express").Router();
const config = require("../utilities/config");
const GalleryImage = require("../models/galleryImage");
const commonFuncs = require("../utilities/commonFuncs");
const jwt = require("jsonwebtoken");
const multer = require("../multer");
const fs = require("fs");
const path = require("path");

galleryImagesRouter.get("/", async (request, response) => {
  const galleryImages = await GalleryImage.find({});
  response.json(galleryImages);
});

galleryImagesRouter.post(
  "/",
  multer.upload.single("galleryImage"),
  async (request, response) => {
    const token = commonFuncs.getToken(request);
    const decodedToken = jwt.verify(token, config.SECRET_STRING);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const obj = {
      caption: request.body.caption,
      image: {
        data: fs.readFileSync(
          path.join(
            __dirname.replace("/controllers", "") +
              "/uploads/" +
              request.file.filename
          )
        ),
      },
    };

    if (!obj.caption || !obj.image) {
      return response.status(401).json({ error: "input field missing" });
    }

    const galleryImage = new GalleryImage({
      caption: obj.caption,
      image: obj.image,
    });
    try {
      const savedGalleryImage = await galleryImage.save();
      response.status(201).json(savedGalleryImage);
    } catch {
      response.status(404).end();
    }
  }
);

galleryImagesRouter.delete("/:id", async (request, response) => {
  const token = commonFuncs.getToken(request);
  const id = request.params.id;
  const decodedToken = jwt.verify(token, config.SECRET_STRING);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  try {
    await GalleryImage.findByIdAndRemove(id);
    response.status(204).end();
  } catch {
    response.status(404).end();
  }
});

module.exports = galleryImagesRouter;
