import React from "react";

function BookNow(props) {
  return (
    <div className="col-2 book-now-btn">
      <button className="btn btn-primary" onClick={props.clickFunc}>
        Book Now
      </button>
    </div>
  );
}

export default BookNow;
