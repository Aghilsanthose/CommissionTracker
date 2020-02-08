import React from "react";

import classes from "./CompanyInfo.module.css";

const CompanyInfo = () => {
  return (
    <div className={classes.companyinfo}>
      <div className={classes.companyname}>
        <h1>SAKTHI YARNS</h1>
        <p>(A quality yarn provider)</p>
      </div>

      {/* Address and bank container */}

      <div className={classes.container}>
        {/* Address Information */}
        <div className={classes.address}>
          <p>2/144 B vadugapalayam</p>
          <p>Kittampalayam</p>
          <p>Coimbatore - 641659</p>
          <p>Mobile: 9566632872, 9976193047</p>
        </div>

        {/* Bank Information */}
        <div className={classes.bank}>
          <p>Bank Name : HDFC Bank</p>
          <p>Branch: Keeranatham</p>
          <p>IFSC Code : HDF000464</p>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CompanyInfo;
