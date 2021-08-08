module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("tbl_transaction", {
    sender_account: {
      type: Sequelize.STRING
    },
    reciever_account: {
      type: Sequelize.STRING
    },
    token: {
      type: Sequelize.FLOAT
    },
    tx_hash: {
      type: Sequelize.STRING
    },
    balance: {
      type: Sequelize.FLOAT
    }
  });

  return Transaction;
};
