const router = require("express").Router();
const { Partner, User, Review } = require("../database");
const passport = require("passport");
const { Op } = require("sequelize");
const validatePartnerProfileUpdate = require("../validations/partner");

// @route   POST /api/partner/update-partner
// @desc    Update Partner Profile
// @access  Private
router.post(
  "/update-partner",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validatePartnerProfileUpdate(req.body);

    // Check Validations
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const partnerData = new Partner({
      user_id: req.user.id,
      services: req.body.services,
      ratePerHour: req.body.ratePerHour,
      currentLocation: req.body.currentLocation,
      phoneNumber: req.body.phoneNumber
    });
    Partner.findOne({
      where: {
        user_id: req.user.id
      }
    })
      .then(item => {
        if (!item) {
          partnerData
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
          item.services = req.body.services;
          item.ratePerHour = req.body.ratePerHour;
          item.currentLocation = req.body.currentLocation;
          if (item.jobsCompleted == "") {
            item.jobsCompleted == null;
          }
          Partner.update(
            {
              services: item.services,
              ratePerHour: item.ratePerHour,
              currentLocation: item.currentLocation,
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

// @route   GET /api/partner
// @desc    Get partner belongsto user
// @access  Public
router.get("/all", (req, res) => {
  Partner.belongsTo(User, { foreignKey: "user_id" });
  Partner.findAll({
    include: [
      {
        model: User,
        require: true
      }
    ]
  })
    .then(partner => res.status(200).json(partner))
    .catch(err => console.log(err));
});
router.get("/partner/:partnerId", (req, res) => {
  const partnerId = req.params.partnerId;
  Partner.belongsTo(User, { foreignKey: "user_id" });
  Partner.findOne({ include: [User], where: { user_id: partnerId } })
    .then(partner => res.status(200).json(partner))
    .catch(err => console.log(err));
});

router.get("/partnerdetails", (req, res) => {
  var page = Number(req.query.page);
  const limit = 5;
  const offset = limit * (page - 1);
  const queryData = {
    services: req.query.services,
    cityName: req.query.cityName
  };
  Partner.belongsTo(User, { foreignKey: "user_id" });
  Review.belongsTo(User, { foreignKey: "partner_id" });
  Partner.hasMany(Review, { foreignKey: "user_id" });
  Partner.findAndCountAll({
    limit,
    offset,
    where: {
      services: {
        [Op.contains]: [queryData.services]
      },
      currentLocation: {
        [Op.contains]: [queryData.cityName]
      }
    },
    include: [
      {
        model: User,
        require: true
      },
      {
        model: Review,
        require: true,
        include: [
          {
            model: User,
            require: true
          }
        ],
        limit: 2
      }
    ],
    nestedResult: true
  })
    .then(partner => {
      var count = partner.count;
      var pageInfo = {
        firstPage: 1,
        prevPage: page - 1,
        currPage: page,
        nextPage: page + 1,
        lastPage: Math.ceil(count / 5)
      };
      if (Math.ceil(count / 5) === pageInfo.firstPage) {
        pageInfo.lastPage = null;
      }
      if (pageInfo.firstPage === pageInfo.nextPage) {
        pageInfo.nextPage = null;
      }
      if (pageInfo.nextPage > Math.ceil(count / 5)) {
        pageInfo.nextPage = null;
      }
      if (Math.ceil(count / 5) === 1) {
        pageInfo.nextPage = null;
        pageInfo.prevPage = null;
      }
      if (pageInfo.currPage === 1) {
        pageInfo.prevPage = null;
      }
      var result = partner.rows;
      res.json({ pageInfo, result });
    })
    .catch(err => console.log(err));
});

router.get(
  "/partner-profile-data",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const customerId = req.user.id;
    Partner.findOne({ where: { user_id: customerId } })
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
