import instance from "../../Hoc/axiosInstance";
import * as actionTypes from "../ActionTypes";

const loading = () => {
  return {
    type: actionTypes.LOADING
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
    type: actionTypes.ERROR,
    data: errMsg
  };
};

const convertingObjToArr = dataObj => {
  const tempArr = [];
  for (let key in dataObj) {
    tempArr.push({ key: key, data: dataObj[key] });
  }
  return tempArr;
};

export const retrivingDatafromServer = type => {
  // console.log("Type of customer", type);
  return dispatch => {
    dispatch(loading());
    const database = type === "buyer" ? "/buyer.json" : "/seller.json";
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
