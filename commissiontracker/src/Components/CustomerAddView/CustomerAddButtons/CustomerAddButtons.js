import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./CustomerAddButtons.module.css";

const customerAddButtons = () => {
  return (
    <div className={classes.overalldisplaybutton}>
      <div className={[classes.individualbutton, classes.addbuyer].join(" ")}>
        <NavLink to="/customer/buyer" activeClassName={classes.active}>
          Add Buyer
        </NavLink>
      </div>
      <div className={[classes.individualbutton, classes.addseller].join(" ")}>
        <NavLink to="/customer/seller" activeClassName={classes.active}>
          Add Seller
        </NavLink>
      </div>
      <div className={[classes.individualbutton, classes.buyerlist].join(" ")}>
        <NavLink to="/customer/buyerlist" activeClassName={classes.active}>
          Buyer's List
        </NavLink>
      </div>
      <div className={[classes.individualbutton, classes.sellerlist].join(" ")}>
        <NavLink to="/customer/sellerlist" activeClassName={classes.active}>
          Seller's List
        </NavLink>
      </div>
    </div>
  );
};

export default customerAddButtons;
