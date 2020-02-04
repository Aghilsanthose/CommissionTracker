import React from "react";

import IndividualYarnView from "./IndividualYarnView/IndividualYarnView";
import classes from "./DateWiseYarnView.module.css";

const dateWiseYarnView = props => {
  // console.log("individual", props.data);
  return (
    <div className={classes.datewiseYarnView}>
      {props.data.date}
      <div>
        {props.data.dataArray.map((indEL, index) => (
          <IndividualYarnView
            key={props.data.dataArray[index].key}
            dataArr={props.data.dataArray[index]}
            updateHandler={() =>
              props.updateHandler(
                props.data.dataArray[index].key,
                props.data.date
              )
            }
            detailsButton={() =>
              props.detailsButton(props.data.dataArray[index].key)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default dateWiseYarnView;
