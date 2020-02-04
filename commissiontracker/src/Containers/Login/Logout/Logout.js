import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actionCreators from "../../../Store/ActionCreators/logIn";

class Logout extends Component {
  state = {};
  componentDidMount() {
    this.props.logout();
    window.localStorage.removeItem("userId");
  }
  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actionCreators.authLogout())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Logout));
