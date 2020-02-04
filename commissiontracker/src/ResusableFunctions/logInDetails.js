const logInDetails = () => {
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
    }
  };
};

export default logInDetails;
