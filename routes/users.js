const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { User, Customer, Partner } = require("../database");
const validateRegisterInput = require("../validations/register");
const validateLoginInput = require("../validations/login");
const { secretOrKey } = require("../config/keys");

// @route   GET /api/users
// @desc    Get all users
// @access  Public
router.get("/", (req, res) => {
  User.findAll({})
    .then(users => {
      if (!users) {
        return res.json("No User Found..");
      }
      res.json(users);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST /api/users/register
// @desc    Register new user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validations
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      errors.email = "Email Already Exist...";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        accountType: req.body.accountType,
        password: req.body.password
      });
      bcrypt.genSalt(12, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.status(200).json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET /api/users/login
// @desc    Login user
// @access  Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validations
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    where: {
      email
    }
  })
    .then(user => {
      if (!user) {
        errors.email = "No user registred with this email";
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // sign jwt token
          const payload = {
            id: user.dataValues.id,
            name: user.dataValues.name,
            email: user.dataValues.email,
            accountType: user.dataValues.accountType
          };
          jwt.sign(
            payload,
            secretOrKey,
            {
              expiresIn: 86400
            },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Incorrect Password";
          return res.status(400).json(errors);
        }
      });
    })
    .catch(err => console.log(err));
});

router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const userData = {
      id: req.user.id,
      name: req.user.name,
      accountType: req.user.accountType,
      email: req.user.email
    };
    res.status(200).json(userData);
  }
);

router.get(
  "/current-city",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    if (req.user.accountType === "Customer") {
      Customer.findOne({ where: { user_id: req.user.id } })
        .then(customerCity => {
          if (!customerCity) {
            return res.status(400).json("City Not Found");
          } else {
            res.status(200).json({ currentLocation: customerCity.currentCity });
          }
        })
        .catch(err => console.log(err));
    } else {
      Partner.findOne({ where: { user_id: req.user.id } })
        .then(partnerCity => {
          if (!partnerCity) {
            return res.status(400).json("City Not Found");
          } else {
            res
              .status(200)
              .json({ currentLocation: partnerCity.currentLocation });
          }
        })
        .catch(err => console.log(err));
    }
  }
);

module.exports = router;
