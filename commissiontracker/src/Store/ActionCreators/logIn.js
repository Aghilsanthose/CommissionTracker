import axios from "axios";
import * as actionTypes from "../Reducers/LoginReducer/actionTypes";

const loading = () => {
  return {
    type: actionTypes.LOGINLOADING
  };
};

const authStart = () => {
  return {
    type: actionTypes.AUTHSTART
  };
};

export const authSuccess = (userId, token) => {
  return {
    type: actionTypes.AUTHSUCCESS,
    userId: userId,
    token: token
  };
};

const authFail = errMsg => {
  return {
    type: actionTypes.AUTHFAIL,
    data: errMsg
  };
};

const authExpiry = () => {
  return {
    type: actionTypes.AUTHEXPIRY
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTHLOGOUT
  };
};

const syncAuthExpiry = expiryTime => dispatch => {
  dispatch(setTimeout(authExpiry(),+expiryTime*1000));
};

export const authenticatingUser = authObj => dispatch => {
  dispatch(authStart());
  dispatch(loading());
  axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1NGWRNXQUgv3J6nRp8oXLbexOyMSYuXQ`,
      authObj
    )
    .then(response => {
      console.log("In auth", response);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(loading());
      syncAuthExpiry(response.data.expiresIn);
    })
    .catch(err => {
      dispatch(loading());
      dispatch(authFail(err.response.data.error.message));
    });
};
