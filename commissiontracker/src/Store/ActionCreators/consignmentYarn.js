import instance from "../../Hoc/axiosInstance";
import * as actionTypes from "../Reducers/Consignment/actionTypes";

const loading = () => {
  return {
    type: actionTypes.CONSIGNMENTLOADING
  };
};

const error = errMsg => {
  return {
    type: actionTypes.CONSIGNMENTERROR,
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

export const storingYarnData = (dataObj, replaceFn, userId) => {
  return dispatch => {
    // console.log("In Acttion creator", dataObj);
    dispatch(loading());
    instance
      .post(`/consignment/yarn.json?auth=${userId}`, dataObj)
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

const choosingCorrectUrlPath = (filterArr, userId) => {
  let url = `consignment/yarn.json?auth=${userId}`;
  if (filterArr && filterArr.length > 0) {
    switch (filterArr[0].label) {
      case "buyerName":
        return `${url}&orderBy="buyerName"&equalTo="${filterArr[0].value}"`;
      case "sellerName":
        return `${url}&orderBy="sellerName"&equalTo="${filterArr[0].value}"`;
      case "paymentStatus":
        return `${url}&orderBy="paymentStatus"&equalTo="${filterArr[0].value}"`;
      case "date":
        return `${url}&orderBy="timeStamp"&startAt=${filterArr[0].value.startDate}&endAt=${filterArr[0].value.endDate}`;
    }
  } else {
    return url;
  }
};

const filterOtherValues = (filterArr, yarnData) => {
  let tempOtherFilteredValues = yarnData;
  for (let i = 1; i < filterArr.length; i++) {
    if (filterArr[i].label !== "date") {
      tempOtherFilteredValues = tempOtherFilteredValues.filter(
        element => element[filterArr[i].label] === filterArr[i].value
      );
    } else {
      tempOtherFilteredValues = tempOtherFilteredValues.filter(
        element =>
          element.timeStamp >= filterArr[i].value.startDate &&
          element.timeStamp <= filterArr[i].value.endDate
      );
    }
  }
  return tempOtherFilteredValues;
};

export const retrivingYarnDataFromServer = (filterArr, userId) => {
  return dispatch => {
    const url = choosingCorrectUrlPath(filterArr, userId);
    let modifiedData = [];
    dispatch(loading());
    instance
      .get(`${url}`)
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
            totalBags: response.data[key].totalBags,
            paymentStatus: response.data[key].paymentStatus
          });
        }
        if (filterArr && filterArr.length > 1) {
          modifiedData = filterOtherValues(filterArr, modifiedData);
        }
        // console.log("Modified Data", modifiedData);
        dispatch(storingYarnDataToRedux(modifiedData));
      })
      .catch(err => {
        dispatch(loading());
        dispatch(error(err.message));
      });
  };
};

export const storingPaidCommission = (commissionObj, key, userId) => {
  return dispatch => {
    dispatch(loading());
    instance
      .patch(`/consignment/yarn/${key}.json?auth=${userId}`, commissionObj)
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
