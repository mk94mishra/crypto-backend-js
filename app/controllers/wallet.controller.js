const db = require("../models");
const transferToken = require("../common/tranferToken");
const Wallet = db.wallet;
const Op = db.Sequelize.Op;

// Create and Save a new Wallet
exports.create = (req, res) => {
  // Validate request
  if (!req.body.account && !req.body.private_key) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a wallet
  const wallet = {
    account: req.body.account,
    private_key: req.body.private_key,
    mnemonic: req.body.mnemonic,
    user_id: req.userId,
    is_active: req.body.is_active ? req.body.is_active : true
  };

  // Save Wallet in the database
  Wallet.create(wallet)
    .then(data => {
      data.private_key = "saved";
      console.log(data);
      res.send({"status":"success", "data":data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Wallet."
      });
    });
};

exports.getBalance = (req,res) => {
  Wallet.findOne({ where: { user_id: req.userId } })
    .then(data => {
      transferToken.checkBalance(data.account,(err,balance,eth_balance) => {
        res.send({"status":"success", "data":{balance:balance,eth_balance:eth_balance}});
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving wallet."
      });
    });
}

exports.detail = (req,res) => {
  Wallet.findOne({ where: { user_id: req.userId } })
    .then(data => {
      transferToken.checkBalance(data.account,(err,balance,eth_balance) => {
        const walletData = {
          account:data.account,
          balance:balance,
          eth_balance:eth_balance 
        }
        res.send({"status":"success", "data":walletData});
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving wallet."
      });
    });
}