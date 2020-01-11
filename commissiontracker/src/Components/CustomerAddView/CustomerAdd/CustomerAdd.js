import React from "react";
import { Route } from "react-router-dom";

import BuyerAdd from "./BuyerAdd/BuyerAdd";
import SellerAdd from "./SellerAdd/SellerAdd";

const customerAdd = props => {
  return (
    <React.Fragment>
      <Route path="/customer/buyer" component={BuyerAdd} />
      <Route path="/customer/seller" component={SellerAdd} />
    </React.Fragment>
  );
};

export default customerAdd;
