import * as actionTypes from "./actionTypes";

const initialState = {
  buyerList: [],
  sellerList: [],
  loading: false,
  errorMsg: null
};

const storingBuyerData = (state, data) => {
  // console.log("In view Reducer", data);
  return {
    ...state,
    buyerList: data
  };
};

const storingSellerData = (state, data) => {
  // console.log("In view Reducer", data);
  return {
    ...state,
    sellerList: data
  };
};

const viewInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BUYERLISTSTORE:
      return storingBuyerData(state, action.payload);
    case actionTypes.SELLERLISTSTORE:
      // console.log("In seller list");
      return storingSellerData(state, action.payload);
    case actionTypes.CUSTOMERVIEWLOADING:
      return {
        ...state,
        loading: !state.loading
      };
    case actionTypes.CUSTOMERVIEWERROR:
      return {
        ...state,
        errorMsg: action.data
      };
    default:
      return state;
  }
};

export default viewInfoReducer;
