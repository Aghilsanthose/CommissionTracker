import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import classes from "./YarnView.module.css";
import Spinner from "../../../../Components/Spinner/Spinner";
import * as actionCreators from "../../../../Store/ActionCreators/consignmentYarn";
import DateWiseYarnView from "../../../../Components/Consignment/DateWiseYarnView/DateWiseYarnView";
import Modal from "../../../../Components/Modal/Modal";
import BackDrop from "../../../../Components/BackDrop/Backdrop";
import Input from "../../../../Components/Input/Input";

import yarnModalDetails from "../../../../ResusableFunctions/yarnModalDetails";
import validationFunction from "../../../../ResusableFunctions/validationFunction";

class YarnView extends Component {
  state = {
    yarnModal: yarnModalDetails(),
    updateKey: NaN,
    updateKeyDate: null,
    modal: false,
    buyerPendingCommission: NaN,
    sellerPendingCommission: NaN
  };

  locatingParticularYarnHistoryData = () => {
    return this.props.yarnHistoryList
      .find(element => {
        return element.date === this.state.updateKeyDate;
      })
      .dataArray.find(element => element.key === this.state.updateKey);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.updateKey && prevState.updateKey !== this.state.updateKey) {
      const particularData = this.locatingParticularYarnHistoryData();
      const buyer =
        +particularData.totalBags * +particularData.buyerCommission -
        particularData.buyerPaidCommission;
      const seller =
        +particularData.totalBags * +particularData.sellerCommission -
        particularData.sellerPaidCommission;
      this.setState({
        buyerPendingCommission: buyer,
        sellerPendingCommission: seller
      });
    }
  }

  componentDidMount() {
    this.props.retrivingYarnData();
  }

  updateHandler = (key, date) => {
    this.setState({ updateKey: key, updateKeyDate: date, modal: true });
  };

  updateCloseHandler = () => {
    this.setState({ modal: false });
  };

  onChangeHandler = (event, id) => {
    const temp = {
      ...this.state.yarnModal,
      [id]: {
        ...this.state.yarnModal[id]
      }
    };

    temp[id].value = event.target.value;
    if (temp[id].validation.isRequired) {
      temp[id].error = validationFunction(
        temp[id].validation,
        event.target.value
      );
    }
    this.setState({ yarnModal: temp });
  };

  modalSubmitHandler = event => {
    event.preventDefault();

    const particularData = this.locatingParticularYarnHistoryData();

    const commissionObj = {
      buyerPaidCommission:
        +particularData.buyerPaidCommission +
        +this.state.yarnModal.buyerPaidCommission.value,
      sellerPaidCommission:
        +particularData.sellerPaidCommission +
        +this.state.yarnModal.sellerPaidCommission.value,
      totalPaidCommission:
        +particularData.totalPaidCommission +
        (+this.state.yarnModal.buyerPaidCommission.value +
          +this.state.yarnModal.sellerPaidCommission.value)
    };
    this.props.storingPaidCommission(commissionObj, this.state.updateKey);
  };

  render() {
    // console.log("In", this.props.yarnHistoryList);

    let yarnModalArr = [];
    for (let key in this.state.yarnModal) {
      yarnModalArr.push(this.state.yarnModal[key]);
    }

    let yarnList = [];
    if (this.props.loading) {
      yarnList = <Spinner />;
    }

    if (this.props.yarnHistoryList.length > 0) {
      yarnList = this.props.yarnHistoryList.map(individualElement => {
        return (
          <DateWiseYarnView
            key={individualElement.date}
            data={individualElement}
            updateHandler={this.updateHandler}
          />
        );
      });
    }

    if (this.props.errMsg) {
      yarnList = <div>errMsg</div>;
    }

    //Displaying Modal on click on Update
    let modal = null;

    let modalData = (
      <React.Fragment>
        <form onSubmit={this.modalSubmitHandler} className={classes.form}>
          <div className={classes.formtitle}>UPDATING COMMISSION</div>
          <p className={classes.pendinginfo}>
            Pending(
            <span className={classes.buyer}>
              {" "}
              B ={this.state.buyerPendingCommission}{" "}
            </span>
            ,{" "}
            <span className={classes.seller}>
              S ={this.state.sellerPendingCommission} )
            </span>
          </p>
          <div className={classes.input}>
            {yarnModalArr.map(individualFormElement => {
              return (
                <Input
                  key={individualFormElement.id}
                  onChangeHandler={event =>
                    this.onChangeHandler(event, individualFormElement.id)
                  }
                  id={individualFormElement.id}
                  elementType={individualFormElement.elementType}
                  elementConfig={individualFormElement.elementConfig}
                  error={individualFormElement.error}
                  validation={individualFormElement.validation}
                  touched={individualFormElement.touched}
                  value={individualFormElement.value}
                  errorMsg={individualFormElement.errorMsg}
                />
              );
            })}
          </div>
          <div className={classes.buttoncontainer}>
            <button className={classes.green}>CONTINUE</button>
            <button
              type="button"
              onClick={this.updateCloseHandler}
              className={classes.red}
            >
              CANCEL
            </button>
          </div>
        </form>
      </React.Fragment>
    );

    if (this.props.loading && this.state.modal) {
      modalData = <Spinner />;
    }

    if (this.state.modal) {
      modal = (
        <React.Fragment>
          <Modal open>{modalData}</Modal>
          <BackDrop clicked={this.updateCloseHandler} />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className={classes.fixed}></div>
        <div className={classes.yarnview}>
          {yarnList}
          {modal}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    yarnHistoryList: state.consignment.yarnHistoryList,
    loading: state.common.loading,
    errMsg: state.common.errMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    retrivingYarnData: () =>
      dispatch(actionCreators.retrivingYarnDataFromServer()),
    storingPaidCommission: (commissionObj, key) =>
      dispatch(actionCreators.storingPaidCommission(commissionObj, key))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(YarnView)
);
