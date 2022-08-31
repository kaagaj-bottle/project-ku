const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const Member = require("../models/member");
const config = require("../utilities/config");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const member = await Member.findOne({ username });
  const isPasswordCorrect =
    member === null
      ? false
      : await bcrypt.compare(password, member.passwordHash);

  if (!isPasswordCorrect) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const token = jwt.sign(
    { username: member.username, id: member._id },
    config.SECRET_STRING
  );

  response
    .status(200)
    .send({ token, username: member.username, name: member.name });
});

module.exports = loginRouter;
