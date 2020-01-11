import React from "react";
import classes from "./IndividualCustomerView.module.css";

const individualCustomerView = props => {
  // console.log("Indiv Customer", props.data);
  let typeCls = [classes.logo, classes.green].join(" ");
  let typeValue = "Buyer";
  let titleCls = [classes.title, classes.titlebuyercolor].join(" ");
  if (props.type === "seller") {
    typeCls = [classes.logo, classes.red].join(" ");
    typeValue = "Seller";
    titleCls = [classes.title, classes.titlesellercolor].join(" ");
  }

  //Hovering Effect on buyer and seller badges

  return (
    <div className={classes.individualcustomer}>
      <div className={typeCls}>{typeValue}</div>
      <div className={classes.individualyarndata}>
        <div className={titleCls}>{props.data.name}</div>
        <div className={classes.remainingdata}>
          <div className={classes.address}>
            <div>
              <span>Add :</span> {props.data.address}
            </div>
            <div>
              <span>Mobil_No:</span>
              {props.data.mobile_no}
            </div>
          </div>
          <div>
            <span>GSTIN : </span>
            {props.data.gstin}
          </div>
        </div>
      </div>
    </div>
  );
};

export default individualCustomerView;
