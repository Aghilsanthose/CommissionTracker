import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import Footer from "./Components/UI/Footer/Footer";
import Login from "./Containers/Login/Login";
import Layout from "./Components/Layout/Layout";
import ToolBar from "./Components/UI/ToolBar/ToolBar";
import SideDraw from "./Components/UI/SideDraw/SideDraw";
import BackDrop from "./Components/UI/BackDrop/Backdrop";
import CustomerAddView from "./Components/CustomerAddView/CustomerAddView";
import Consignment from "./Components/Consignment/Consignment";
import YarnView from "./Containers/CosignmentInfomation//Yarn/View/YarnView";
import Details from "./Containers/CosignmentInfomation/Yarn/Details/Details";
import Logout from "./Containers/Login/Logout/Logout";
import BuyerRecipt from "./Components/Consignment/Yarn/BuyerSellerRecipt/BuyerRecipt/BuyerRecipt";
import SellerRecipt from "./Components/Consignment/Yarn/BuyerSellerRecipt/SellerRecipt/SellerRecipt";
import BuyerPDFRecipt from "./Components/Consignment/Yarn/BuyerSellerRecipt/BuyerSellerPDFRecipt/BuyerPDFRecipt/BuyerPDFRecipt";
import SellerPDFRecipt from "./Components/Consignment/Yarn/BuyerSellerRecipt/BuyerSellerPDFRecipt/SellerPDFRecipt/SellerPDFRecipt";

import * as actionCreators from "./Store/ActionCreators/customerView";
import * as actionCreatorsLogin from "./Store/ActionCreators/logIn";

class App extends Component {
  state = {
    sideDraw: false
  };

  sideDrawHandler = () => {
    this.setState((prevState, props) => {
      return {
        sideDraw: !prevState.sideDraw
      };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const localStorage = window.localStorage;
    if (prevProps.buyerList.length === 0) {
      this.props.retrivingDataFromServer("buyer", this.props.userId);
    }

    if (prevProps.sellerList.length === 0) {
      this.props.retrivingDataFromServer("seller", this.props.userId);
    }

    const data = {
      userId: this.props.userId,
      token: this.props.token
    };
    localStorage.setItem("userId", JSON.stringify(data));
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userId"));
    if (userData) {
      this.props.authSuccess(userData.userId, userData.token);
    }
  }

  render() {
    let sideDraw = null;
    if (this.state.sideDraw) {
      sideDraw = (
        <React.Fragment>
          <SideDraw clicked={this.sideDrawHandler} />
          <BackDrop clicked={this.sideDrawHandler} />
        </React.Fragment>
      );
    }

    const header = (
      <Layout>
        {sideDraw}
        <ToolBar openSideDraw={this.sideDrawHandler} />
      </Layout>
    );

    let otherPaths = null;

    if (this.props.userId) {
      otherPaths = (
        <div className="grid">
          {header}
          <div>
            <Switch>
              <Route
                path="/history/:id/details/recipt/buyerPDF"
                component={BuyerPDFRecipt}
              />
              <Route
                path="/history/:id/details/recipt/sellerPDF"
                component={SellerPDFRecipt}
              />
              <Route
                path="/history/:id/details/buyer/recipt"
                component={BuyerRecipt}
              />
              <Route
                path="/history/:id/details/seller/recipt"
                component={SellerRecipt}
              />
              <Route path="/history/:id/details" component={Details} />
              <Route path="/history" component={YarnView} />
              <Route path="/customer" component={CustomerAddView} />
              <Route path="/logout" component={Logout} />
              <Route path="/" component={Consignment} />
            </Switch>
          </div>
          <Footer />
        </div>
      );
    } else {
      otherPaths = (
        <React.Fragment>
          <Route path="/login" exact component={Login} />;
          <Redirect from="/" to="/login" />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className="background"></div>
        <div className="app">{otherPaths}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    buyerList: state.viewInfo.buyerList,
    sellerList: state.viewInfo.sellerList,
    userId: state.auth.userId,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    retrivingDataFromServer: (type, userId) =>
      dispatch(actionCreators.retrivingDatafromServer(type, userId)),
    authSuccess: (userId, token) =>
      dispatch(actionCreatorsLogin.authSuccess(userId, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
