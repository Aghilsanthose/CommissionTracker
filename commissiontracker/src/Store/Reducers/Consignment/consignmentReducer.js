import * as actionTypes from "./actionTypes";

const initialState = {
  yarnHistoryList: [],
  modal: false,
  loading: false,
  errorMsg: null
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
    case actionTypes.CONSIGNMENTLOADING:
      return {
        ...state,
        loading: !state.loading
      };
    case actionTypes.CONSIGNMENTERROR:
      return {
        ...state,
        errorMsg: action.data
      };
    default:
      return {
        ...state
      };
  }
};

export default consignmentReducer;
