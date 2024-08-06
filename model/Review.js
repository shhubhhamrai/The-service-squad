module.exports = (sequelize, Sequelize) => {
  return sequelize.define("review", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    partner_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  });
};
