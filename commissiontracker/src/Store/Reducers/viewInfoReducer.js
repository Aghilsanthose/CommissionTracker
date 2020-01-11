import * as actionTypes from "../ActionTypes";

const initialState = {
  buyerList: [],
  sellerList: []
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
      break;
    case actionTypes.SELLERLISTSTORE:
      // console.log("In seller list");
      return storingSellerData(state, action.payload);
      break;
    default:
      return state;
  }
};

export default viewInfoReducer;
