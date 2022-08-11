const noticesRouter = require("express").Router();
let notices = [
  {
    id: 1,
    title: "HTML is easy",
    date: "2022-01-10T17:30:31.098Z",
  },
  {
    id: 2,
    title: "Browser can execute only Javascript",
    date: "2022-01-10T18:39:34.091Z",
  },
  {
    id: 3,
    title: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-01-10T19:20:14.298Z",
  },
];
noticesRouter.get("/", async (request, response) => {
  response.json(notices);
});

module.exports = noticesRouter;
