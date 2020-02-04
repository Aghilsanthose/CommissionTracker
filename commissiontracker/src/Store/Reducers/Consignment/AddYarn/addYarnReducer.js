import * as actionTypes from "./actionTypes";

const initialState = {
  addYarnLoading: false,
  addYarnErrMsg: null
};

const addYarnReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADDYARNLOADING:
      return {
        ...state,
        loading: !state.loading
      };
    case actionTypes.ADDYARNERROR:
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

export default addYarnReducer;
