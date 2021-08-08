module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("tbl_user", {
      name: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };