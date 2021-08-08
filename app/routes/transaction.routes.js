const { authJwt } = require("../middleware");
const transaction = require("../controllers/transaction.controller.js");


module.exports = app => {
  
  var router = require("express").Router();

  // Create a new transaction
  router.post("/", transaction.create);

  app.use("/api/transaction", 
  [authJwt.verifyToken],
  router);
};
