import React, { Component } from "react";
import "./App.css";

import Layout from "./Containers/Layout/Layout";
import ToolBar from "./Components/ToolBar/ToolBar";
import SideDraw from "./Components/SideDraw/SideDraw";
import BackDrop from "./Components/BackDrop/Backdrop";
import CustomerAddView from "./Components/CustomerAddView/CustomerAddView";

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

  render() {
    let sideDraw = null;
    if (this.state.sideDraw) {
      sideDraw = (
        <React.Fragment>
          <SideDraw />
          <BackDrop clicked={this.sideDrawHandler} />
        </React.Fragment>
      );
    }
    return (
      <div>
        <Layout>
          {sideDraw}
          <ToolBar openSideDraw={this.sideDrawHandler} />
          <CustomerAddView />
        </Layout>
      </div>
    );
  }
}

export default App;
