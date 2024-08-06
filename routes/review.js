const router = require("express").Router();
const { Review, User } = require("../database");
const passport = require("passport");
const validateUserReview = require("../validations/review");

// @route   POST /api/review
// @desc    Post review
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateUserReview(req.body);

    // Check Validations
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const userId = req.user.id;
    const reviewData = new Review({
      user_id: userId,
      partner_id: req.body.partner_id,
      rating: req.body.rating,
      comment: req.body.comment
    });
    reviewData.save().then(review => {
      if (!review) {
        res.status(400).json(errors);
      } else {
        return res.status(200).json(review);
      }
    });
  }
);

// @route   GET /api/review
// @desc    Get partner review
// @access  Public
router.get("/", (req, res) => {
  Review.belongsTo(User, { foreignKey: "user_id" });
  Review.findAll({ include: [User] })
    .then(review => res.status(200).json(review))
    .catch(err => console.log(err));
});

router.get("/:partnerId", (req, res) => {
  const partnerId = req.params.partnerId;
  Review.belongsTo(User, { foreignKey: "user_id" });

  Review.findAll({ include: [User], where: { partner_id: partnerId } })
    .then(review => res.status(200).json(review))
    .catch(err => console.log(err));
});

module.exports = router;
