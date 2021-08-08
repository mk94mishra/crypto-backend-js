module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("tbl_role", {
      role: {
        type: Sequelize.STRING
      }
    });
  
    return Role;
  };