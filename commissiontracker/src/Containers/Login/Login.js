import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../Components/Input/Input";
import Logo from "../../Components/Login/Logo";
import Spinner from "../../Components/UI/Spinner/Spinner";

import * as actionCreators from "../../Store/ActionCreators/logIn";
import signUpDetails from "../../ResusableFunctions/signUpDetails";
import disablingButton from "../../ResusableFunctions/disablingButton";
import validationFunction from "../../ResusableFunctions/validationFunction";
import logInDetails from "../../ResusableFunctions/logInDetails";
import classes from "./Login.module.css";

class Login extends Component {
  state = {
    logInData: logInDetails(),
    signUpData: signUpDetails(),
    logIn: true
  };

  onChangeHandler = (event, id, type) => {
    const temp = {
      ...this.state[type],
      [id]: {
        ...this.state[type][id]
      }
    };

    temp[id].value = event.target.value.toUpperCase();
    if (temp[id].validation.isRequired) {
      if (temp[id].validation.isSame) {
        temp[id].error = validationFunction(
          temp[id].validation,
          event.target.value,
          this.state.signUpData.password.value
        );
      } else {
        temp[id].error = validationFunction(
          temp[id].validation,
          event.target.value
        );
      }
    }

    if (type === "signUpData") {
      this.setState({ signUpData: temp });
    } else {
      this.setState({ logInData: temp });
    }
  };

  logInChangeHandler = () => {
    this.setState(prevState => {
      return { logIn: !prevState.logIn };
    });
  };

  logInSignUpResuableFn = (data, type) => {
    const tempInput = [];
    for (let key in data) {
      tempInput.push(data[key]);
    }
    return tempInput.map(individualFormElement => {
      return (
        <Input
          key={individualFormElement.id}
          onChangeHandler={event =>
            this.onChangeHandler(event, individualFormElement.id, type)
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
        />
      );
    });
  };

  formSubmitHandler = (event, type) => {
    event.preventDefault();
    const authObj = {
      email: this.state[type].email.value,
      password: this.state[type].password.value,
      returnSecureToken: true
    };
    this.props.authenticate(authObj);
  };

  render() {
    // Display of error message in form
    let error = null;

    if (this.props.errorMessage) {
      error = <p className={classes.error}>{this.props.errorMessage}</p>;
    }

    const logIn = (
      <form
        onSubmit={event => this.formSubmitHandler(event, "logInData")}
        className={classes.login}
      >
        {error}
        {this.logInSignUpResuableFn(this.state.logInData, "logInData")}
        <button
          disabled={!disablingButton(this.state.logInData)}
          className={classes.button}
        >
          Log In
        </button>
      </form>
    );

    const SignUp = (
      <form
        onSubmit={event => this.formSubmitHandler(event, "signUpData")}
        className={classes.login}
      >
        {error}
        {this.logInSignUpResuableFn(this.state.signUpData, "signUpData")}
        <button
          disabled={!disablingButton(this.state.signUpData)}
          className={classes.button}
        >
          Sign Up
        </button>
      </form>
    );

    //SignIn and SignUp button

    let loginOrSpinner = this.state.logIn ? logIn : SignUp;

    if (this.props.loading) {
      loginOrSpinner = <Spinner />;
    }

    return (
      <div className={classes.logincontainer}>
        <div className={classes.loginbox}>
          <Logo />
          {loginOrSpinner}
          {/* <button
            onClick={this.logInChangeHandler}
            className={[classes.swtichbutton, classes.button].join(" ")}
          >
            Swtich to {this.state.logIn ? "SignUp" : "LogIn"}
          </button> */}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    errorMessage: state.auth.errMsg
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    authenticate: authObj =>
      dispatch(actionCreators.authenticatingUser(authObj))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
