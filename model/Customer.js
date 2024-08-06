module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "customer",
    {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      currentCity: {
        type: Sequelize.STRING,
        allowNull: true
      },
      servicePrefrence: {
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
        allowNull: true
      },
      fullAddress: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      hooks: {
        beforeCreate: customer => {
          const checkArrayData = field => {
            if (Array.isArray(field) === false) {
              field = field.split(",");
            }
            return field;
          };
          customer.servicePrefrence = checkArrayData(customer.servicePrefrence);
        }
      }
    }
  );
};
