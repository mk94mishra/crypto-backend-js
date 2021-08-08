const { authJwt } = require("../middleware");
const wallet = require("../controllers/wallet.controller.js");
var router = require("express").Router();

module.exports = app => {
  

  // Create a new Wallet
  router.post("/", wallet.create);


  router.get("/", wallet.detail);

  router.get("/balance", wallet.getBalance);

  app.use("/api/wallet", 
  [authJwt.verifyToken],
  router);
};
