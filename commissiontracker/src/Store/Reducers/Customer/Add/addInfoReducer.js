import * as actionTypes from "./actionTypes";

const initialState = {
  errMsg: null,
  loading: false
};

const addInforeducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CUSTOMERADDLOADING:
      return {
        ...state,
        loading: !state.loading
      };
    case actionTypes.CUSTOMERADDERROR:
      return {
        ...state,
        errorMsg: action.data
      };
    default:
      return state;
  }
};

export default addInforeducer;
