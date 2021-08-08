const db = require("../models");
const transferToken = require("../common/tranferToken");
const Wallet = db.wallet;
const Op = db.Sequelize.Op;

// Create and Save a new Wallet
exports.create = (req, res) => {

  const mywallet = transferToken.createWallet()
  console.log(mywallet)
  // Create a wallet
  const wallet = {
    account: mywallet.address,
    private_key: mywallet.privateKey,
    user_id: req.userId,
    is_active: req.body.is_active ? req.body.is_active : true
  };

  // Save Wallet in the database
  Wallet.create(wallet)
    .then(data => {
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
