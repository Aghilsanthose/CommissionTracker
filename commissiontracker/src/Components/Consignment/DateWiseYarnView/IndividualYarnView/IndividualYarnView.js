import React from "react";

import classes from "./IndividualYarnView.module.css";
import buyerSellerLogo from "../../../../Assets/Buyer/buyerSellerLogo.jpg";
import transactionImage from "../../../../Assets/Buyer/transaction.png";

const individualYarnView = props => {
  // console.log("In Indi", props);

  let individualYarnViewcls = [classes.individualyarnview].join(" ");

  const buyerPaidCommission = props.dataArr.buyerPaidCommission;
  const sellerPaidCommission = props.dataArr.sellerPaidCommission;
  const totalPaidCommission = props.dataArr.totalPaidCommission;
  const totalCommission = props.dataArr.totalCommission;
  let status = null;
  if (totalPaidCommission < totalCommission) {
    status = (
      <div className={classes.pending}>
        Pending[{" "}
        <span className={classes.seller}>
          S ={" "}
          {props.dataArr.sellerCommission * props.dataArr.totalBags -
            sellerPaidCommission}
          {", "}
        </span>
        <span className={classes.buyer}>
          B ={" "}
          {props.dataArr.buyerCommission * props.dataArr.totalBags -
            buyerPaidCommission}
          {", "}
        </span>
        T = {totalCommission - totalPaidCommission}]
      </div>
    );
  } else {
    status = <div>PAID</div>;
    individualYarnViewcls = [classes.individualyarnview, classes.paid].join(
      " "
    );
  }

  return (
    <div className={individualYarnViewcls}>
      <div className={classes.headercontainer}>
        <div className={classes.header}>
          <div className={classes.red}>{props.dataArr.sellerName}</div>{" "}
          <span>&#8658;</span>
          <div className={classes.green}>{props.dataArr.buyerName}</div>
          <img src={buyerSellerLogo} />
        </div>
        <div className={classes.status}>{status}</div>
      </div>

      <div className={classes.container}>
        <img src={transactionImage} />
        <div className={classes.pendinginfoplusdata}>
          <div className={classes.transactiondata}>
            <div>
              <label>Order Id:</label> {props.dataArr.key}
            </div>
            <div>
              <label>Time:</label>
              {new Date(props.dataArr.timeStamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
        <div className={classes.amount}>
          <span>&#8377;</span> {props.dataArr.totalCommission}
        </div>
      </div>
      <div className={classes.buttoncontainer}>
        {totalCommission <= totalPaidCommission ? null : (
          <button onClick={props.updateHandler}>UPDATE</button>
        )}
        <button onClick={props.detailsButton}>DETAILS</button>
      </div>
    </div>
  );
};

export default individualYarnView;
