const db = require("../models");
const Reciever = db.reciever;
const Op = db.Sequelize.Op;

// Create and Save a new Wallet
exports.create = (req, res) => {
  // Validate request
  if (!req.body.reciever_account ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a wallet
  const reciever = {
    account: req.body.reciever_account,
    user_id: req.userId,
    is_active: req.body.is_active ? req.body.is_active : true
  };

  // Save Wallet in the database
  Reciever.create(reciever)
    .then(data => {
      console.log(data);
      res.send({"status":"success", "data":data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while save the account."
      });
    });
};

// Retrieve all account from the database.
exports.findAll = (req, res) => {

  Reciever.findAll({ where: {user_id:req.userId }})
    .then(data => {
      res.send({"status":"succes","data":data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving account."
      });
    });
};
