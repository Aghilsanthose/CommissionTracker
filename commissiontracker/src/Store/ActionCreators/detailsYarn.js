import instance from "../../Hoc/axiosInstance";
import * as actionTypes from "../Reducers/Details/actionTypes";

const loading = () => {
  return {
    type: actionTypes.DETAILSLOADING
  };
};

const error = errMsg => {
  return {
    type: actionTypes.DETAILSERROR,
    data: errMsg
  };
};

const storingBuyerInfo = buyerData => {
  return {
    type: actionTypes.STORINGBUYERINFO,
    data: buyerData
  };
};

const storingSellerInfo = sellerData => {
  return {
    type: actionTypes.STORINGSELLERINFO,
    data: sellerData
  };
};

const storingConsignmentInfo = consignmentData => {
  return {
    type: actionTypes.STORINGCONSIGNMENTINFO,
    data: consignmentData
  };
};

export const retrivingBuyerDataForDetails = (buyerKey, userID) => dispatch => {
  instance
    .get(`/buyer/${buyerKey}.json?auth=${userID}`)
    .then(response => {
      const modifiedObj = { ...response.data, key: buyerKey };
      // console.log("buyerResponse", response.data);
      dispatch(storingBuyerInfo(modifiedObj));
    })
    .catch(err => {
      dispatch(loading());
      dispatch(error(err.message));
    });
};

export const retrivingSellerDataForDetails = (
  sellerKey,
  userID
) => dispatch => {
  instance
    .get(`/seller/${sellerKey}.json?auth=${userID}`)
    .then(response => {
      const modifiedObj = { ...response.data, key: sellerKey };
      // console.log("sellerResponse", response.data);
      dispatch(storingSellerInfo(modifiedObj));
    })
    .catch(err => {
      dispatch(loading());
      dispatch(error(err.message));
    });
};

export const retrivingConsignmentForDetails = (
  consignmentKey,
  userID
) => dispatch => {
  dispatch(loading());
  instance
    .get(`/consignment/yarn/${consignmentKey}.json?auth=${userID}`)
    .then(response => {
      dispatch(loading());
      // console.log("Details", response.data);
      dispatch(storingConsignmentInfo(response.data));
    })
    .catch(err => {
      dispatch(loading());
      dispatch(error(err.message));
      console.log("Error", err);
    });
};
