import React from "react";

import classes from "./Signature.module.css";

const signature = () => {
  return (
    <div className={classes.signature}>
      <p className={classes.name}>Signature of proprietor</p>
      <p className={classes.name}>(T PREMKUMAR)</p>

      <p className={classes.end}>*** End of Invoice***</p>
    </div>
  );
};

export default signature;
