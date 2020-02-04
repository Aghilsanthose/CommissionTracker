import instance from "../../Hoc/axiosInstance";
import * as actionTypes from "../Reducers/Customer/View/actionTypes";

const loading = () => {
  return {
    type: actionTypes.CUSTOMERVIEWLOADING
  };
};

const storingRetrivalData = (type, data) => {
  return {
    type:
      type === "buyer"
        ? actionTypes.BUYERLISTSTORE
        : actionTypes.SELLERLISTSTORE,
    payload: data
  };
};

const error = errMsg => {
  return {
    type: actionTypes.CUSTOMERVIEWERROR,
    data: errMsg
  };
};

const convertingObjToArr = dataObj => {
  const tempArr = [];
  for (let key in dataObj) {
    tempArr.push({ key: key, data: dataObj[key] });
  }

  tempArr.sort((a, b) => {
    const val1 = a.data.name.toUpperCase();
    const val2 = b.data.name.toUpperCase();
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  });

  return tempArr;
};

export const retrivingDatafromServer = (type, userId) => {
  // console.log("Type of customer", type);
  return dispatch => {
    dispatch(loading());
    const database =
      type === "buyer"
        ? `/buyer.json?auth=${userId}`
        : `/seller.json?auth=${userId}`;
    instance
      .get(database)
      .then(response => {
        // console.log("Buyer data", response.data);
        dispatch(loading());
        dispatch(storingRetrivalData(type, convertingObjToArr(response.data)));
      })
      .catch(err => {
        dispatch(loading());
        dispatch(error(err.message));
        // console.log(err.message);
      });
  };
};
