import React from "react";
import { Route } from "react-router-dom";

import Yarn from "../../Containers/CosignmentInfomation/Yarn/Yarn";
import Cotton from "../../Containers/CosignmentInfomation/Cotton/Cotton";
import ConsignmentButtons from "./ConsignmentButtons/ConsignmentButtons";
import classes from "./Consignment.module.css";

const consignment = props => {
  return (
    <React.Fragment>
      <div className={classes.consignment}></div>
      <ConsignmentButtons />
      <Route path="/yarn" component={Yarn} />
      <Route path="/cotton" component={Cotton} />
    </React.Fragment>
  );
};

export default consignment;
