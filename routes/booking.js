const { Op } = require("sequelize");
const router = require("express").Router();
const { Booking, Partner, User } = require("../database");
const passport = require("passport");
const bookingInput = require("../validations/booking");
const moment = require("moment");
const { accountSid, authToken } = require("../config/keys");
const client = require("twilio")(accountSid, authToken);

router.post(
  "/availability",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = bookingInput(req.body);

    // Check Validations
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const bookedPartner = req.body.bookedPartner;
    const selectedForDateFrom = req.body.selectedForDateFrom;
    const selectedForDateTo = req.body.selectedForDateTo;
    Booking.findOne({
      where: {
        bookedPartner: bookedPartner,
        [Op.or]: [
          {
            selectedForDateFrom: {
              [Op.between]: [selectedForDateFrom, selectedForDateTo]
            }
          },
          {
            selectedForDateTo: {
              [Op.between]: [selectedForDateFrom, selectedForDateTo]
            }
          }
        ]
      }
    })
      .then(result => {
        if (!result) {
          // save logic
          const bookingData = new Booking({
            bookingUser: req.user.id,
            bookedPartner: req.body.bookedPartner,
            address: req.body.address,
            bookedForService: req.body.bookedForService,
            zipCode: req.body.zipCode,
            phoneNumber: req.body.phoneNumber,
            selectedForDateFrom: req.body.selectedForDateFrom,
            selectedForDateFrom: req.body.selectedForDateFrom,
            selectedForDateTo: req.body.selectedForDateTo,
            addressType: req.body.addressType
          });

          bookingData
            .save()
            .then(booking => {
              if (!booking) {
                res.status(400).json(errors);
              } else {
                res.status(200).json(booking);
                client.messages
                  .create({
                    body: `Hello ${
                      req.body.partnerName
                    }, We received booking from ${
                      req.body.customerName
                    }, Phone Number: ${req.body.phoneNumber}, from : ${moment(
                      req.body.selectedForDateFrom
                    ).format("DD MMM YYYY")} to : ${moment(
                      req.body.selectedForDateTo
                    ).format("DD MMM YYYY")}, for ${req.body.bookedForService}`,
                    from: "+13374150052",
                    to: `+91${req.body.partnerNumbre}`
                  })
                  .then(message =>
                    console.log(
                      "Message Send : ",
                      message.sid,
                      req.body.partnerNumbre,
                      req.body.partnerName,
                      message.body
                    )
                  );
              }
            })
            .catch(err =>
              res.status(400).json({
                internavErr: "Booking can not be done at this moment try again"
              })
            );
        } else {
          // you can't book
          res.status(400).json({
            notAvailable: "Partner Not Available for this time period"
          });
        }
      })
      .catch(err => console.log(err));
  }
);

router.get(
  "/partner-bookings/:partnerId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Booking.findAll({ where: { bookedPartner: req.params.partnerId } })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => console.log(err));
  }
);

router.get(
  "/customer-bookings/:bookingUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Booking.findAll({
      where: { bookingUser: req.params.bookingUser }
    })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
