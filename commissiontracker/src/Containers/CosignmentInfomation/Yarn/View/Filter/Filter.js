import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";
import classes from "./Filter.module.css";
import Input from "../../../../../Components/Input/Input";

import * as actionCreators from "../../../../../Store/ActionCreators/consignmentYarn";
import filterDetails from "../../../../../ResusableFunctions/filterDetails";

class Filter extends Component {
  state = {
    filter: filterDetails(),
    startDate: undefined,
    endDate: undefined,
    filterButton: false
  };

  updatingBuyerSellerList = (type, buyerSellerList) => {
    const tempObj = {
      ...this.state.filter,
      [type]: {
        ...this.state.filter[type]
      }
    };

    //converting suitable Array and assigning to options value

    const buyerSellerNameArr = buyerSellerList.map(inEl => {
      return inEl.data.name;
    });

    const tempArr = [];

    for (let key of buyerSellerNameArr) {
      tempArr.push({
        value: key,
        label: key
      });
    }

    tempObj[type].options = tempArr;

    if (
      !(
        this.state.filter[type].options.every((inEl, index) => {
          return inEl.value === buyerSellerList[index].data.name;
        }) && this.state.filter[type].options.length === buyerSellerList.length
      )
    ) {
      this.setState({
        filter: tempObj
      });
    }
  };

  componentDidUpdate() {
    this.updatingBuyerSellerList("buyerName", this.props.buyerList);
    this.updatingBuyerSellerList("sellerName", this.props.sellerList);
  }

  startDateHandler = date => {
    console.log("Start", date);
    this.setState({
      startDate: date
    });
  };

  endDateHandler = date => {
    console.log("End", new Date(date.setHours(23, 59, 59, 0)));
    this.setState({
      endDate: new Date(date.setHours(24, 59, 59, 0))
    });
  };

  onChangeHandler = (event, id) => {
    const tempObj = {
      ...this.state.filter,
      [id]: {
        ...this.state.filter[id]
      }
    };

    tempObj[id].value = event;

    // console.log("event", event);

    this.setState({ filter: tempObj });
  };

  filterHandler = () => {
    const tempFilterValueArr = [];
    if (this.state.filterButton) {
      for (let key in this.state.filter) {
        tempFilterValueArr.push({
          value: this.state.filter[key].value.value,
          label: key
        });
      }
      tempFilterValueArr.push({
        label: "date",
        value:
          this.state.startDate || this.state.endDate
            ? {
                startDate: this.state.startDate
                  ? this.state.startDate.getTime()
                  : undefined,
                endDate: this.state.endDate
                  ? this.state.endDate.getTime()
                  : undefined
              }
            : undefined
      });

      // console.log(tempFilterValueArr);
      this.props.retrivingYarnListFromServer(
        tempFilterValueArr.filter(element => element.value !== undefined)
      );
    }
  };

  filterOnOffHandler = () => {
    if (this.state.filterButton) {
      this.props.retrivingYarnListFromServer();
    }
    return this.setState(prevState => {
      return {
        filterButton: !prevState.filterButton
        // filter: tempObj
      };
    });
  };

  clearFilters = () => {
    const tempObj = {
      ...this.state.filter,
      buyerName: {
        ...this.state.filter.buyerName,
        value: ""
      },
      sellerName: {
        ...this.state.filter.sellerName,
        value: ""
      },
      paymentStatus: {
        ...this.state.filter.paymentStatus,
        value: ""
      }
    };
    this.props.retrivingYarnListFromServer();
    this.setState({
      filter: tempObj,
      startDate: undefined,
      endDate: undefined
    });
  };

  render() {
    // console.log("State in filter", this.state);

    const filterArr = [];
    for (let key in this.state.filter) {
      filterArr.push(this.state.filter[key]);
    }

    const filterItems = filterArr.map(individualFormElement => {
      return (
        <Input
          key={individualFormElement.id}
          onChangeHandler={event =>
            this.onChangeHandler(event, individualFormElement.id)
          }
          id={individualFormElement.id}
          options={individualFormElement.options}
          elementType={individualFormElement.elementType}
          elementConfig={individualFormElement.elementConfig}
          error={individualFormElement.error}
          validation={individualFormElement.validation}
          touched={individualFormElement.touched}
          value={individualFormElement.value}
          errorMsg={individualFormElement.errorMsg}
          isAsyncSelect={individualFormElement.isAsyncSelect}
          filter
        />
      );
    });

    let filter = null;

    if (this.state.filterButton) {
      filter = (
        <div className={classes.filtercontainer}>
          <div className={classes.date}>
            <label>Start Date </label>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.startDateHandler}
              className={classes.calender}
            />
            <label>End Date </label>
            <DatePicker
              selected={this.state.endDate}
              onChange={this.endDateHandler}
              className={classes.calender}
            />
          </div>
          <div className={classes.otherfilters}>{filterItems}</div>
          <div className={classes.buttoncontainer}>
            <button
              onClick={this.clearFilters}
              className={[classes.filterbutton, classes.applyclearbutton].join(
                " "
              )}
            >
              Clear
            </button>
            <button
              className={[classes.filterbutton, classes.applyclearbutton].join(
                " "
              )}
              onClick={this.filterHandler}
            >
              Apply
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className={classes.filter}>
        <button
          onClick={this.filterOnOffHandler}
          className={classes.filterbutton}
        >
          Filter
        </button>
        {filter}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    buyerList: state.viewInfo.buyerList,
    sellerList: state.viewInfo.sellerList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    retrivingYarnListFromServer: filterArr =>
      dispatch(actionCreators.retrivingYarnDataFromServer(filterArr))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
