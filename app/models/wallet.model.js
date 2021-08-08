module.exports = (sequelize, Sequelize) => {
  const Wallet = sequelize.define("tbl_wallet", {
    account: {
      type: Sequelize.STRING
    },
    private_key: {
      type: Sequelize.STRING
    },
    mnemonic: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    is_active: {
      type: Sequelize.BOOLEAN
    }
  });

  return Wallet;
};
