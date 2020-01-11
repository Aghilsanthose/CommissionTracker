import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Layout from "./Containers/Layout/Layout";
import ToolBar from "./Components/ToolBar/ToolBar";
import SideDraw from "./Components/SideDraw/SideDraw";
import BackDrop from "./Components/BackDrop/Backdrop";
import CustomerAddView from "./Components/CustomerAddView/CustomerAddView";
import Consignment from "./Components/Consignment/Consignment";
import YarnView from "./Containers/CosignmentInfomation/Yarn/View/YarnView";

import * as actionCreators from "./Store/ActionCreators/customerView";

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

  componentDidMount() {
    this.props.retrivingDataFromServer("buyer");
    this.props.retrivingDataFromServer("seller");
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
    return (
      <div className="app">
        <Layout>
          {sideDraw}
          <ToolBar openSideDraw={this.sideDrawHandler} />
          <Switch>
            <Route path="/history" component={YarnView} />
            <Route path="/customer" component={CustomerAddView} />
            <Route path="/" component={Consignment} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sellerList: state.viewInfo.sellerList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    retrivingDataFromServer: type =>
      dispatch(actionCreators.retrivingDatafromServer(type))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
