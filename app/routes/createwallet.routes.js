const { authJwt } = require("../middleware");
const createwallet = require("../controllers/createwallet.controller.js");
var router = require("express").Router();

module.exports = app => {

  // Create a new Wallet
  router.get("/", createwallet.create);

  app.use("/api/createwallet", 
  [authJwt.verifyToken],
  router);
};
