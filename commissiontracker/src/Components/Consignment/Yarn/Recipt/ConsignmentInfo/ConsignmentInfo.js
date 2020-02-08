import React from "react";

import classes from "./ConsignmentInfo.module.css";

const consignmentInfo = props => {
  console.log("Props", props);
  return (
    <div className={classes.consignmentinfo}>
      <p>COMMISSION INFO</p>
      <table>
        <tr>
          <th>Count</th>
          <th>Type</th>
          <th>Total Bags</th>
          <th>{props.type} Commission/Bag</th>
          <th>Total Commission</th>
        </tr>
        <tr>
          <td>{props.consignmentInfo.count}</td>
          <td>{props.consignmentInfo.type}</td>
          <td>{props.consignmentInfo.totalBags}</td>
          <td>{props.consignmentInfo.commissionBuyer}</td>
          <td>
            {(props.type === "Buyer"
              ? props.consignmentInfo.commissionBuyer
              : props.consignmentInfo.commissionSeller) *
              props.consignmentInfo.totalBags}
          </td>
        </tr>
      </table>
      <hr />
    </div>
  );
};

export default consignmentInfo;
