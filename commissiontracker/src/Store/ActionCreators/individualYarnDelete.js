import instance from "../../Hoc/axiosInstance";

import * as actionTypes from "../Reducers/Consignment/IndividualYarnDelete/actionTypes";

const loading = () => {
  return {
    type: actionTypes.INDIVIDUALYARNDELTELOADING
  };
};

const error = errMsg => {
  return {
    type: actionTypes.INDIVIDUALYARNDELTEERROR,
    data: errMsg
  };
};

const individualYarnDeleteIdentifier = () => {
  return {
    type: actionTypes.INDIVIDUALYARNDELETEIDENTIFIER
  };
};

export const individualYarnDeleteModal = () => {
  return {
    type: actionTypes.INDIVIDUALYARNDELTEMODAL
  };
};

export const deletingIndividualYarn = (key, userId) => dispatch => {
  dispatch(loading());
  instance
    .delete(`consignment/yarn/${key}.json?auth=${userId}`)
    .then(response => {
      console.log("In yarn Delete", response);
      dispatch(loading());
      dispatch(individualYarnDeleteModal());
      dispatch(individualYarnDeleteIdentifier());
      dispatch(individualYarnDeleteIdentifier());
    })
    .catch(err => {
      console.log("In Catch", err);
      dispatch(error(err.message));
    });
};
