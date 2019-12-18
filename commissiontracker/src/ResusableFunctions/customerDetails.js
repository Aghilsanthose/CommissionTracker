const customerData = () => {
  return {
    name: {
      id: "name",
      elementType: "input",
      elementConfig: { type: "text", placeholder: "Name", name: "name" },
      error: false,
      validation: {
        isRequired: true,
        minLength: 3
      },
      touched: false,
      value: "",
      errorMsg: "Name should be minimum of 3 Letter's"
    },
    gstin: {
      id: "gstin",
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "GSTIN",
        name: "gstin"
      },
      error: false,
      validation: {
        isRequired: true,
        fixedLength: 15
      },
      touched: false,
      value: "",
      errorMsg: "GSTIN should be 15 digit"
    },
    mobno: {
      id: "mobno",
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Mobile Number",
        name: "mobno"
      },
      error: false,
      validation: {
        isRequired: true,
        fixedLength: 10
      },
      touched: false,
      value: "",
      errorMsg: "Enter valid Mobile Number"
    },
    streetno: {
      id: "streetno",
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street No",
        name: "streetno"
      },
      error: false,
      validation: {
        isRequired: true,
        minLength: 2
      },
      touched: false,
      value: "",
      errorMsg: "Enter mininum of 2 character's"
    },
    village: {
      id: "village",
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Village",
        name: "village"
      },
      error: false,
      validation: {
        isRequired: true,
        minLength: 2
      },
      touched: false,
      value: "",
      errorMsg: "Enter mininum of 2 character's"
    },
    district: {
      id: "district",
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "District",
        name: "district"
      },
      error: false,
      validation: {
        isRequired: true,
        minLength: 2
      },
      touched: false,
      value: "",
      errorMsg: "Enter mininum of 2 character's"
    },
    pincode: {
      id: "pincode",
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Pincode",
        name: "pincode"
      },
      error: false,
      validation: {
        isRequired: true,
        fixedLength: 6
      },
      touched: false,
      value: "",
      errorMsg: "Enter valid Pincode"
    }
  };
};

export default customerData;
