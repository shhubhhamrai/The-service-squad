module.exports = (sequelize, Sequelize) => {
  return sequelize.define("subscribe", {
    email: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
};
