import React, { useState } from "react";
import "./selectCity.styles.scss";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentCity } from "../../redux/actions/authActions";

function SelectCityModal() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const loggedInUser = useSelector(state => state.auth);
  let city = loggedInUser.currentLocation;
  const dispatch = useDispatch();

  const selectCityAndDispatch = event => {
    dispatch(setCurrentCity(event.currentTarget.textContent));
    toggleModal();
  };

  return (
    <div>
      <div className="select-city" onClick={toggleModal}>
        {city} &nbsp;&nbsp;
        <i className="fas fa-chevron-down"></i>
      </div>
      <Modal className="my-modal" isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Choose your preferred city
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="select-city-ul d-flex justify-content-center">
              <div className="city-name" onClick={selectCityAndDispatch}>
                Jodhpur
              </div>
              <div className="city-name" onClick={selectCityAndDispatch}>
                Jaipur
              </div>
              <div className="city-name" onClick={selectCityAndDispatch}>
                Agra
              </div>
              <div className="city-name" onClick={selectCityAndDispatch}>
                Pune
              </div>
              <div className="city-name" onClick={selectCityAndDispatch}>
                Mumbai
              </div>
              <div className="city-name" onClick={selectCityAndDispatch}>
                Delhi
              </div>
              <div className="city-name" onClick={selectCityAndDispatch}>
                Haydrabad
              </div>
              <div className="city-name" onClick={selectCityAndDispatch}>
                Chandigarh
              </div>
              <div className="city-name" onClick={selectCityAndDispatch}>
                Ahemdabad
              </div>
              <div className="city-name" onClick={selectCityAndDispatch}>
                Panji
              </div>
              <div className="city-name" onClick={selectCityAndDispatch}>
                Chennai
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default SelectCityModal;
