module.exports = (sequelize, Sequelize) => {
  return sequelize.define("users", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    accountType: {
      type: Sequelize.ENUM("Partner", "Customer"),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
};
