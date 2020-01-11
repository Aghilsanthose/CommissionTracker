import * as actionTypes from "../ActionTypes";

const initialState = {
  yarnHistoryList: [],
  modal: false
};

const storingYarnDataFromServer = (state, data) => {
  // console.log("In Reducer", data);
  return {
    ...state,
    yarnHistoryList: data
  };
};

const consignmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORINGYARNDATAFROMSERVER:
      return storingYarnDataFromServer(state, action.data);
    case actionTypes.OPENCLOSEMODALINHISTORY:
      return {
        ...state,
        modal: !state.modal
      };
    default:
      return {
        ...state
      };
  }
};

export default consignmentReducer;
