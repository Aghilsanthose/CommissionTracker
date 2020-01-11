import instance from "../../Hoc/axiosInstance";
import * as actionTypes from "../ActionTypes";

const loading = () => {
  return {
    type: actionTypes.LOADING
  };
};

const error = errMsg => {
  return {
    type: actionTypes.ERROR,
    data: errMsg
  };
};

const storingYarnDataToRedux = data => {
  return {
    type: actionTypes.STORINGYARNDATAFROMSERVER,
    data: sortingModifiedData(data)
  };
};

const sortingModifiedData = arr => {
  const outsideArr = [];
  let insideArr = [];

  // console.log("before sorting", arr);

  for (let index = 0; index < arr.length; index++) {
    insideArr.push(arr[index]);
    if (arr[index + 1]) {
      if (arr[index].date !== arr[index + 1].date) {
        // console.log("inside Array", insideArr);
        outsideArr.push({ date: arr[index].date, dataArray: insideArr });
        insideArr = [];
        // console.log("Inside IF");
      }
    } else {
      outsideArr.push({ date: arr[index].date, dataArray: insideArr });
    }
  }

  outsideArr.sort((a, b) => {
    return b.dataArray[0].timeStamp - a.dataArray[0].timeStamp;
  });
  return outsideArr;
};

export const storingYarnData = (dataObj, replaceFn) => {
  return dispatch => {
    // console.log("In Acttion creator", dataObj);
    dispatch(loading());
    instance
      .post("/consignment/yarn.json", dataObj)
      .then(reponse => {
        dispatch(loading());
        replaceFn("/home");
      })
      .catch(err => {
        dispatch(loading());
        // console.log("Error", err.message);
        dispatch(error(err.message));
      });
  };
};

export const retrivingYarnDataFromServer = () => {
  return dispatch => {
    const modifiedData = [];
    dispatch(loading());
    instance
      .get("/consignment/yarn.json")
      .then(response => {
        dispatch(loading());
        for (let key in response.data) {
          modifiedData.push({
            key: key,
            buyerName: response.data[key].buyerName,
            sellerName: response.data[key].sellerName,
            totalCommission: response.data[key].totalCommission,
            date: response.data[key].date,
            timeStamp: response.data[key].timeStamp,
            buyerPaidCommission: response.data[key].buyerPaidCommission,
            sellerPaidCommission: response.data[key].sellerPaidCommission,
            totalPaidCommission: response.data[key].totalPaidCommission,
            buyerCommission: response.data[key].commissionBuyer,
            sellerCommission: response.data[key].commissionSeller,
            totalBags: response.data[key].totalBags
          });
        }

        // console.log("checking", modifiedData);
        // console.log("calling function", sortingModifiedData(modifiedData));
        dispatch(storingYarnDataToRedux(modifiedData));
        // console.log("In action creator", modifiedData);
      })
      .catch(err => {
        dispatch(loading());
        dispatch(error(err.message));
      });
  };
};

export const storingPaidCommission = (commissionObj, key, replaceFn) => {
  return dispatch => {
    dispatch(loading());
    instance
      .patch(`/consignment/yarn/${key}.json`, commissionObj)
      .then(response => {
        dispatch(loading());
        window.location.reload();
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
