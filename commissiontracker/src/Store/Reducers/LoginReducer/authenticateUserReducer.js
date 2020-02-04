import * as actionTypes from "./actionTypes";

const initialState = {
  userId: null,
  token: null,
  errMsg: null,
  loading: false
};

const authenticateUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHSTART:
      return {
        ...state
      };
    case actionTypes.AUTHSUCCESS:
      return {
        ...state,
        userId: action.userId,
        token: action.token,
        errMsg: null
      };
    case actionTypes.AUTHEXPIRY:
      return {
        ...state,
        userId: null,
        token: null
      };
    case actionTypes.AUTHFAIL:
      return {
        ...state,
        userId: null,
        token: null,
        errMsg: action.data
      };
    case actionTypes.AUTHLOGOUT:
      return {
        ...state,
        userId: null,
        token: null,
        errMsg: null
      };
    case actionTypes.LOGINLOADING:
      return {
        ...state,
        loading: !state.loading
      };
    case actionTypes.LOGINERROR:
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

export default authenticateUserReducer;
