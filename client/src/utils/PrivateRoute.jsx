import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import CONSTANTS from "../components/resuables/routes.json";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={CONSTANTS.ROUTES.LOGIN} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

// const mapStateToProps = ({ auth }) => ({
//   auth,
// });

export default PrivateRoute;
