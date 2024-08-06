import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import store from "./redux/store";
import { Route, Switch } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./redux/actions/authActions";
import Homepage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Signin from "./pages/signin/signin.component";
import SignUp from "./pages/signup/signup.component";
import CustomerProfileUpdate from "./pages/customer/profile-udpate/profile-update.component";
import PartnerProfileUpdate from "./pages/partner/profile-update/profile-update.component";
import CustomerDashboard from "./pages/customer/dashboard/dashboard.component";
import PartnerDashboard from "./pages/partner/dashboard/dashboard.component";
import PartnerDisplay from "./components/partnerCard/PartnerCard.component";
import AllPartner from "./components/partnerCard/AllPartner.component";
import BookingComponent from "./components/Bookings/BookingComponent";

// check for token
if (localStorage.jwtToken) {
  // set Auth token to header
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info
  const decode = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decode));
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/login" component={Signin} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/category/:name" component={AllPartner} />
            {/* Customer Profile update page */}
            <Route
              exact
              path="/customer/profile"
              component={CustomerProfileUpdate}
            />
            {/* Partner Profile update page */}
            <Route
              exact
              path="/partner/profile"
              component={PartnerProfileUpdate}
            />
            {/* Booking Route */}
            <Route exact path="/booking" component={BookingComponent} />
            {/* User Dashboard page */}
            <Route path="/dashboard/customer" component={CustomerDashboard} />
            {/* Partner Dashboard page */}
            <Route path="/dashboard/partner" component={PartnerDashboard} />
            <Route
              exact
              path="/partner/:partnerId"
              component={PartnerDisplay}
            />
          </Switch>
          <Footer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
