import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./partnerCard.styles.scss";
import axios from "axios";

import profileImg from "../../assests/profile.png";
import convertDate from "../../utils/convertToDate";
import BookNow from "../Bookings/BookNow";
import { bookPartner } from "../../redux/actions/bookingActions";

function PartnerCard(props) {
  const [partner, setPartner] = useState();
  const [reviews, setReviews] = useState();
  let partnerID = props.match.params.partnerId;
  useEffect(() => {
    axios
      .get("/api/partner/partner/" + partnerID)
      .then(result => setPartner(result.data))
      .catch(err => console.log(err));
    axios
      .get("/api/review/" + partnerID)
      .then(result => setReviews(result.data))
      .catch(err => console.log(err));
  }, [partnerID]);

  const dispatch = useDispatch();

  const handleBookNow = () => {
    const partnerData = {
      partnerName: partner.user.name,
      partnerId: partner.user_id,
      phoneNumbre: partner.phoneNumber
    };
    dispatch(bookPartner(partnerData));
    props.history.push("/booking");
  };

  if (!partner) {
    return <div>Loading User Data...</div>;
  }
  if (!reviews) {
    return <div>Loading User Data...</div>;
  } else {
    return (
      <div className="partner-wrapper">
        <div className="row">
          <div className="col-3">
            <img
              className="partner-image"
              src={profileImg}
              alt="partner-card"
            />
          </div>
          <div className="col-3 partner-info">
            <h5>{partner.user.name}</h5>
            <div>{partner.services[0]} Expert</div>
            <div className="ratings">
              <strong>{partner.jobsCompleted} &nbsp;</strong> Jobs Completed
            </div>
          </div>
          <div className="col-4 area-expertise">
            <strong>Area of Expertise</strong>
            <br />
            {partner.services.map((item, index) => {
              return (
                <div key={index}>
                  <span>{item} </span>
                </div>
              );
            })}
            <br />
            <strong>Location : </strong>
            {partner.currentLocation.map((item, index) => {
              return <span key={index}>{item} </span>;
            })}
          </div>
          <BookNow clickFunc={handleBookNow} />
        </div>
        {reviews.length > 0 ? (
          <>
            <div className="horizontl-line">
              <hr />
            </div>
            <div className="customer-review">
              <strong>Customer Reviews</strong>
              {reviews.map(item => {
                return (
                  <div className="row reviews" key={item.id}>
                    <div className="col-1">
                      <img
                        className="review-image"
                        src={profileImg}
                        alt="partner-card"
                      />
                    </div>
                    <div className="col-9">
                      <span>{item.user.name}</span> &nbsp;
                      <span>{item.rating}</span>
                      <div>{item.comment}</div>
                    </div>
                    <div className="col-2">{convertDate(item.createdAt)}</div>
                  </div>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

export default PartnerCard;
