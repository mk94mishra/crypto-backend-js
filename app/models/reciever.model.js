module.exports = (sequelize, Sequelize) => {
  const Reciever = sequelize.define("tbl_reciever", {
    account: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    is_active: {
      type: Sequelize.BOOLEAN
    }
  });

  return Reciever;
};
