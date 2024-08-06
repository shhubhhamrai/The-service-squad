module.exports = (sequelize, Sequelize) => {
  return sequelize.define("booking", {
    bookingUser: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    bookedPartner: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    zipCode: {
      type: Sequelize.STRING,
      allowNull: false
    },
    bookedForService: {
      type: Sequelize.STRING(
        Sequelize.ENUM(
          "Painting",
          "Carpentry",
          "Cleaning",
          "Plumbing",
          "Electrical",
          "Appliances"
        )
      ),
      allowNull: false
    },
    addressType: {
      type: Sequelize.STRING,
      allowNull: true
    },
    selectedForDateFrom: {
      type: Sequelize.DATE,
      allowNull: false
    },
    selectedForDateTo: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });
};
