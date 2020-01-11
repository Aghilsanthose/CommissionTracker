const yarnModalDetails = () => {
  return {
    buyerPaidCommission: {
      id: "buyerPaidCommission",
      elementType: "input",
      elementConfig: {
        label: "Buyer Commission",
        name: "buyerPaidCommission"
      },
      elementConfig: {
        type: "number",
        placeholder: "Buyer Commission",
        name: "buyerPaidCommission"
      },
      error: false,
      validation: {
        isRequired: true,
        minLength: 1
      },
      touched: false,
      value: "",
      errorMsg: "Buyer Commission should be 1 digit"
    },
    sellerPaidCommission: {
      id: "sellerPaidCommission",
      elementType: "input",
      elementConfig: {
        label: "Seller Commission",
        name: "sellerPaidCommission"
      },
      elementConfig: {
        type: "number",
        placeholder: "Seller Commission",
        name: "sellerPaidCommission"
      },
      error: false,
      validation: {
        isRequired: true,
        minLength: 1
      },
      touched: false,
      value: "",
      errorMsg: "seller Commission should be 1 digit"
    }
  };
};

export default yarnModalDetails;
