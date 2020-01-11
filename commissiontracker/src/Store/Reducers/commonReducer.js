import * as actionTypes from "../ActionTypes";

const initialState = {
  loading: false,
  errorMsg: null
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        loading: !state.loading
      };
      break;
    case actionTypes.ERROR:
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

export default commonReducer;
