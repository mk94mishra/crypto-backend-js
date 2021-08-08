const { authJwt } = require("../middleware");
const reciever = require("../controllers/reciever.controller.js");
var router = require("express").Router();

module.exports = app => {
  

  // Create a new reciever
  router.post("/", reciever.create);

  router.get("/", reciever.findAll);

  app.use("/api/reciever", 
  [authJwt.verifyToken],
  router);
};
