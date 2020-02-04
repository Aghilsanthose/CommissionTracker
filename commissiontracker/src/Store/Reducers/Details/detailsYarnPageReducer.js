import * as actionTypes from "./actionTypes";

const initialState = {
  buyerInfo: null,
  sellerInfo: null,
  consignmentInfo: null,
  buyerPDFRecipt: false,
  loading: false,
  errMsg: null
};

const detailsYarnPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORINGCONSIGNMENTINFO:
      return {
        ...state,
        consignmentInfo: action.data
      };

    case actionTypes.STORINGBUYERINFO:
      return {
        ...state,
        buyerInfo: action.data
      };

    case actionTypes.STORINGSELLERINFO:
      return {
        ...state,
        sellerInfo: action.data
      };
    case actionTypes.DETAILSLOADING:
      return {
        ...state,
        loading: !state.loading
      };
    case actionTypes.DETAILSERROR:
      return {
        ...state,
        errorMsg: action.data
      };
    default:
      return state;
  }
};

export default detailsYarnPageReducer;
