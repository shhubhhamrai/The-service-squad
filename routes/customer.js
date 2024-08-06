const router = require("express").Router();
const { Customer, User } = require("../database");
const passport = require("passport");
const validateCustomerProfileUpdate = require("../validations/customer");

// @route   POST /api/customer/update-customer
// @desc    Update Customer Profile
// @access  Private
router.post(
  "/update-customer",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateCustomerProfileUpdate(req.body);

    // Check Validations
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const customerData = new Customer({
      currentCity: req.body.currentCity,
      user_id: req.user.id,
      servicePrefrence: req.body.servicePrefrence,
      fullAddress: req.body.fullAddress,
      phoneNumber: req.body.phoneNumber
    });
    Customer.findOne({
      where: {
        user_id: req.user.id
      }
    })
      .then(item => {
        if (!item) {
          customerData
            .save()
            .then(saved => {
              if (!saved) {
                return res.status(400).json(errors);
              } else {
                res.status(200).json(saved);
              }
            })
            .catch(err => console.log(err));
        } else {
          item.servicePrefrence = req.body.servicePrefrence.split(",");
          if (item.servicePrefrence == "") {
            item.servicePrefrence = null;
          }
          Customer.update(
            {
              currentCity: req.body.currentCity,
              servicePrefrence: item.servicePrefrence,
              fullAddress: item.fullAddress,
              phoneNumber: req.body.phoneNumber
            },
            { where: { user_id: req.user.id }, returning: true }
          )
            .then(updated => {
              if (!updated) {
                return res.status(400).json(errors);
              } else {
                res.status(200).json(updated);
              }
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }
);

// @route   GET /api/customer
// @desc    Get Customer belongsto user
// @access  Public
router.get("/all", (req, res) => {
  Customer.belongsTo(User, { foreignKey: "user_id" });
  Customer.findAll({
    include: [
      {
        model: User,
        require: true
      }
    ]
  })
    .then(customer => res.status(200).json(customer))
    .catch(err => console.log(err));
});

router.get(
  "/customer-profile-data",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const customerId = req.user.id;
    Customer.findOne({ where: { user_id: customerId } })
      .then(result => {
        if (!result) {
          res.status(400).json({ message: "No User for this is" });
        } else {
          res.status(200).json(result);
        }
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
