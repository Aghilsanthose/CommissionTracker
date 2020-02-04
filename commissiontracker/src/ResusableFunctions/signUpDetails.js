const signUpDetails = () => {
  return {
    email: {
      id: "email",
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email",
        name: "email"
      },
      error: false,
      validation: {
        isRequired: true,
        isEmail: true
      },
      touched: false,
      value: "",
      errorMsg: "Please enter valid email"
    },
    password: {
      id: "password",
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
        name: "password"
      },
      error: false,
      validation: {
        isRequired: true,
        minLength: 8
      },
      touched: false,
      value: "",
      errorMsg: "Password in mandatory"
    },
    confirmPassword: {
      id: "confirmPassword",
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Confirm Password",
        name: "confirmPassword"
      },
      error: false,
      validation: {
        isRequired: true,
        minLength: 8,
        isSame: true
      },
      touched: false,
      value: "",
      errorMsg: "Password Should Match"
    }
  };
};

export default signUpDetails;
