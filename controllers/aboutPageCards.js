const aboutPageCardsRouter = require("express").Router();
const config = require("../utilities/config");
const AboutPageCard = require("../models/aboutPageCard");
const commonFuncs = require("../utilities/commonFuncs");
const jwt = require("jsonwebtoken");
const multer = require("../multer");
const path = require("path");
const fs = require("fs");

aboutPageCardsRouter.get("/", async (request, response) => {
  const aboutPageCards = await AboutPageCard.find({});
  response.json(aboutPageCards);
});

aboutPageCardsRouter.post(
  "/",
  multer.upload.single("aboutPageCardImage"),
  async (request, response) => {
    let { heading, caption, additionalText, imageLink } = request.body;
    const token = commonFuncs.getToken(request);
    const decodedToken = jwt.verify(token, config.SECRET_STRING);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const aboutPageCard = new AboutPageCard({
      heading: request.body.heading,
      caption: request.body.caption,
      additionalText: request.body.additionalText,
      image: {
        data: fs.readFileSync(
          path.join(
            __dirname.replace("/controllers", "") +
              "/uploads/" +
              request.file.filename
          )
        ),
        contentType: "image/png",
      },
    });

    const savedCard = await aboutPageCard.save();
    response.status(201).json(savedCard);
  }
);

aboutPageCardsRouter.delete("/:id", async (request, response) => {
  const token = commonFuncs.getToken(request);
  const id = request.params.id;
  const decodedToken = jwt.verify(token, config.SECRET_STRING);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  try {
    await AboutPageCard.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch {
    response.status(404).end();
  }
});

module.exports = aboutPageCardsRouter;
