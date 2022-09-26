const ContactUsInfo = require("../models/contactUsInfo");
const contactUsInfoRouter = require("express").Router();
const config = require("../utilities/config");
const commonFuncs = require("../utilities/commonFuncs");
const jwt = require("jsonwebtoken");

contactUsInfoRouter.get("/", async (request, response) => {
  const contactUsInfox = await ContactUsInfo.find({});
  response.json(contactUsInfox);
});

contactUsInfoRouter.post("/", async (request, response) => {
  const dataCount = ContactUsInfo.count({});
  if (dataCount > 0) {
    response.status(404).end();
  }
  const token = commonFuncs.getToken(request);

  const decodedToken = jwt.verify(token, config.SECRET_STRING);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const { facebookLink, instagramLink, twitterLink, email } = request.body;

  const contactUsInfoObj = new ContactUsInfo({
    facebookLink,
    twitterLink,
    instagramLink,
    email,
  });

  try {
    const savedObj = await contactUsInfoObj.save();
    response.status(201).json(savedObj);
  } catch {
    response.status(404).end();
  }
});

contactUsInfoRouter.put("/:id", async (request, response) => {
  const token = commonFuncs.getToken(request);

  const decodedToken = jwt.verify(token, config.SECRET_STRING);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const { facebookLink, instagramLink, twitterLink, email } = request.body;
  const id = request.params.id;
  const contactUsInfo = { facebookLink, instagramLink, twitterLink, email };

  try {
    const updatedContactUsInfo = await ContactUsInfo.findByIdAndUpdate(
      id,
      contactUsInfo,
      { new: true }
    );
    response.json(updatedContactUsInfo);
  } catch {
    response.status(404).end();
  }
});

module.exports = contactUsInfoRouter;
