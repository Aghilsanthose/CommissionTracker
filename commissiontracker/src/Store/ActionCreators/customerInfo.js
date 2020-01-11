import * as actionTypes from "../ActionTypes";
import instance from "../../Hoc/axiosInstance";

const loading = () => {
  return {
    type: actionTypes.LOADING
  };
};

export const storeDataOnServer = (dataObj, type, replaceFn) => {
  console.log("In sync function", type);
  return dispatch => {
    dispatch(loading());
    instance
      .post(type === "Buyer" ? "/buyer.json" : "/seller.json", dataObj)
      .then(() => {
        dispatch(loading());
        replaceFn("/customer");
      })
      .catch(err => {
        console.log("In error", err);
      });
  };
};
