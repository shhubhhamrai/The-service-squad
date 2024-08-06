const router = require("express").Router();
const { Subscribe } = require("../database");

const validateSubscribeInput = require("../validations/subscribe");

// @route   POST /api/subscribe
// @desc    Subscribe
// @access  Public
router.post("/", (req, res) => {
  const { errors, isValid } = validateSubscribeInput(req.body);

  // Check Validations
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Subscribe.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      errors.email = "User has been subscribed already...";
      return res.status(400).json(errors);
    } else {
      const newSubscriber = new Subscribe({
        email: req.body.email
      });
      newSubscriber
        .save()
        .then(user => res.status(200).json(user))
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
