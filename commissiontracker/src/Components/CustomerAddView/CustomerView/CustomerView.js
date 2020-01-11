import React, { Component } from "react";
import { Route } from "react-router";

import BuyerView from "./BuyerView/BuyerView";
import SellerView from "./SellerView/SellerView";

const customerView = () => {
  return (
    <React.Fragment>
      <Route path="/customer/buyerlist" component={BuyerView} />
      <Route path="/customer/sellerlist" component={SellerView} />
    </React.Fragment>
  );
};

export default customerView;
