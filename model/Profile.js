module.exports = (sequelize, Sequelize) => {
  return sequelize.define("profile", {
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
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: true
    },
    currentLocation: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });
};
