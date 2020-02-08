import * as actionTypes from "./actionTypes";

const initialState = {
  deleteModal: false,
  error: null,
  loading: false,
  individualYarnDeleteIdentifier: false
};

const individualYarnDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INDIVIDUALYARNDELTELOADING:
      return {
        ...state,
        loading: !state.loading
      };
    case actionTypes.INDIVIDUALYARNDELTEERROR:
      return {
        ...state,
        errorMsg: action.data
      };
    case actionTypes.INDIVIDUALYARNDELTEMODAL:
      return {
        ...state,
        deleteModal: !state.deleteModal
      };
    case actionTypes.INDIVIDUALYARNDELETEIDENTIFIER:
      return {
        ...state,
        individualYarnDeleteIdentifier: !state.individualYarnDeleteIdentifier
      };
    default:
      return {
        ...state
      };
  }
};

export default individualYarnDeleteReducer;
