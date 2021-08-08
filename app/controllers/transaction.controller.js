const db = require("../models");
const transferToken = require("../common/tranferToken");
const Transaction = db.transaction;
const Wallet = db.wallet;
const Op = db.Sequelize.Op;

// Create and Save a new Wallet
exports.create = (req, res) => {
  // Validate request
  if (!req.body.sender_account && !req.body.reciever_account && !req.body.token) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
 
  var sender_account
  var sender_private_key
  var txHash
  var balance
  
  Wallet.findOne({ where: { user_id: req.userId } })
    .then(data => {
      sender_account = data.account;
      sender_private_key = data.private_key;
      // balance cjeck
      transferToken.transferToken(sender_account,req.body.reciever_account, sender_private_key, req.body.token, (txerr,txHash) => {
        transferToken.checkBalance(sender_account,(err,balance) => {
          balance = balance
          console.log(err,balance)
          if(txerr){
            res.send({
              message:
              txerr.message || "Some error occurred while retrieving."
            });
          }
          // ############ transaction 
          const transaction = {
            sender_account: sender_account,
            reciever_account: req.body.reciever_account,
            token: req.body.token,
            tx_hash: txHash,
            balance:String(balance)
          };
          // Save transaction in the database
          Transaction.create(transaction)
            .then(data => {
              res.send({"status":"succes","data":data});
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Wallet."
              });
            });
          // ############
        })
        // end balance chek
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
    console.log(txHash)
    
};

