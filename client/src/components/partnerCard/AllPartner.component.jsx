import React, { useState, useEffect } from "react";
import "./allpartner.styles.scss";
import profileImg from "../../assests/profile.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import convertDate from "../../utils/convertToDate";
import Pagination from "../Pagination";
import Nodata from "../Nodata";

function AllPartner(props) {
  const [partners, setPartners] = useState([]);
  const [pagination, setPagination] = useState({});
  const cat = props.match.params.name;
  const loggedInUser = useSelector(state => state.auth);

  let city = loggedInUser.currentLocation;
  console.log(city);

  useEffect(() => {
    axios
      .get(
        "/api/partner/partnerdetails?services=" +
          cat +
          "&cityName=" +
          city +
          "&page=1"
      )
      .then(result => {
        setPartners(result.data.result);
        setPagination(result.data.pageInfo);
      });
  }, [cat]);

  const getPageData = event => {
    console.log(event.currentTarget.textContent);
    axios
      .get(
        "/api/partner/partnerdetails?services=" +
          cat +
          "&cityName=" +
          city +
          "&page=" +
          event.currentTarget.textContent +
          ""
      )
      .then(result => {
        setPartners(result.data.result);
        setPagination(result.data.pageInfo);
      });
  };

  if (!partners) {
    return <div>Data Loading</div>;
  } else {
    return (
      <div className="partner-wrapper">
        {partners.map(item => {
          return (
            <div key={item.user_id}>
              <div className="row">
                <img
                  className="col-2 partner-image"
                  src={profileImg}
                  alt="partner-profile"
                />
                <div className="col-4 partner-info bdr-right">
                  <h5>{item.user.name}</h5>
                  <div>
                    {item.services.filter(item => item === cat)} Expert ,{" "}
                    {item.currentLocation.filter(item => item === city)}
                  </div>
                  <div className="ratings">
                    <Link
                      className="view-prifile-link"
                      to={`/partner/${item.user_id}`}
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
                <div className="col-3 overallRating">
                  <h3>4.5</h3>
                  <div>Overall Rating</div>
                </div>
                <div className="col-2 book-now-btn">
                  <h3>{item.jobsCompleted}</h3>
                  <div>Jobs Complited</div>
                </div>
              </div>
              {item.reviews.length > 0 ? (
                <div className="customer-review-all">
                  {item.reviews.map(rev => {
                    return (
                      <div key={rev.id} className="row reviews">
                        <div className="col-1">
                          <img
                            className="review-image"
                            src={profileImg}
                            alt="partner-profile"
                          />
                        </div>
                        <div className="col-9">
                          <span>{rev.user.name}</span> &nbsp;
                          <span>{rev.rating}</span>
                          <div>{rev.comment}</div>
                        </div>
                        <div className="col-2">
                          {convertDate(rev.createdAt)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}

              <div className="horizontl-line">
                <hr />
              </div>
            </div>
          );
        })}
        {pagination.lastPage === 0 ? (
          <Nodata />
        ) : (
          <>
            {pagination.nextPage || pagination.prevPage ? (
              <Pagination
                clickFunc={getPageData}
                firstPage={pagination.firstPage}
                prevPage={pagination.prevPage}
                currPage={pagination.currPage}
                nextPage={pagination.nextPage}
                lastPage={pagination.totalPages}
              />
            ) : null}
          </>
        )}
      </div>
    );
  }
}

export default AllPartner;
