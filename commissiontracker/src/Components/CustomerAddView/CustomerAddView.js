import React from "react";

import CustomerAddButtons from "./CustomerAddButtons/CustomerAddButtons";
import CustomerAdd from "./CustomerAdd/CustomerAdd";
import CustomerView from "./CustomerView/CustomerView";
import classes from "./CustomerAddView.module.css";

const customerAddView = () => {
  return (
    <React.Fragment>
      <div className={classes.customer}></div>
      <CustomerAddButtons />
      <CustomerAdd />
      <CustomerView />
    </React.Fragment>
  );
};

export default customerAddView;
