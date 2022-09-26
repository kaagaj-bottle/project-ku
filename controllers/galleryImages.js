const galleryImagesRouter = require("express").Router();
const config = require("../utilities/config");
const GalleryImage = require("../models/galleryImage");
const commonFuncs = require("../utilities/commonFuncs");
const jwt = require("jsonwebtoken");

galleryImagesRouter.get("/", async (request, response) => {
  const galleryImages = await GalleryImage.find({});
  response.json(galleryImages);
});

galleryImagesRouter.post("/", async (request, response) => {
  const token = commonFuncs.getToken(request);
  const decodedToken = jwt.verify(token, config.SECRET_STRING);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const { imageLink, caption } = request.body;

  if (!imageLink || !caption) {
    return response.status(401).json({ error: "input field missing" });
  }

  const galleryImage = new GalleryImage({
    imageLink,
    caption,
  });
  try {
    const savedGalleryImage = await galleryImage.save();
    response.status(201).json(savedGalleryImage);
  } catch {
    response.status(404).end();
  }
});

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
