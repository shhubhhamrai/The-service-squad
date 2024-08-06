module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "partner",
    {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      services: {
        type: Sequelize.ARRAY(
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
      ratePerHour: {
        type: Sequelize.ARRAY(Sequelize.NUMERIC(10, 2)),
        allowNull: false
      },
      jobsCompleted: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      currentLocation: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      hooks: {
        beforeCreate: partner => {
          const checkArrayData = field => {
            if (Array.isArray(field) === false) {
              field = field.split(",");
              console.log("Before Crate Hook : ", field);
            }
            return field;
          };
          partner.services = checkArrayData(partner.services);
          partner.ratePerHour = checkArrayData(partner.ratePerHour);
          partner.currentLocation = checkArrayData(partner.currentLocation);
        }
      }
    }
  );
};
