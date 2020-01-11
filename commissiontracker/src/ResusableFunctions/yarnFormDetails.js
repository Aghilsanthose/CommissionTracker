const yarnFormDetails = () => {
  return {
    buyerName: {
      id: "buyerName",
      elementType: "select",
      elementConfig: {
        label: "Buyer Name",
        name: "buyerName"
      },
      options: [],
      validation: {
        isRequired: true
      },
      touched: false,
      value: "",
      errorMsg: "Buyer Name is mandatory"
    },
    sellerName: {
      id: "sellerName",
      elementType: "select",
      elementConfig: {
        label: "Seller Name",
        name: "sellerName"
      },
      options: [],
      validation: {
        isRequired: true
      },
      touched: false,
      value: "",
      errorMsg: "Seller Name is mandatory"
    },
    type: {
      id: "type",
      elementType: "select",
      elementConfig: {
        label: "Type",
        name: "name"
      },
      options: [{value:"WEFT", label: "WEFT"},{value:"WRAP", label: "WRAP"}],
      validation: {
        isRequired: true
      },
      touched: false,
      value: "Wrap",
      errorMsg: "Type is mandatory"
    },
    count: {
      id: "count",
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Count",
        name: "count"
      },
      error: false,
      validation: {
        isRequired: true,
        fixedLength: 2
      },
      touched: false,
      value: "",
      errorMsg: "Count should be 2 digit"
    },
    totalBags: {
      id: "totalBags",
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Total Bags",
        name: "totalBags"
      },
      error: false,
      validation: {
        isRequired: true,
        minLength: 1
      },
      touched: false,
      value: "",
      errorMsg: "Total Bags should be 1 digit"
    },
    commissionBuyer: {
      id: "commissionBuyer",
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Commmission Buyer Per Bag",
        name: "commissionBuyer"
      },
      error: false,
      validation: {
        isRequired: true,
        minLength: 2
      },
      touched: false,
      value: "",
      errorMsg: "Commission should be 2 digit"
    },
    commissionSeller: {
      id: "commissionSeller",
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Commmission Seller Per Bag",
        name: "commissionBuyer"
      },
      error: false,
      validation: {
        isRequired: true,
        minLength: 2
      },
      touched: false,
      value: "",
      errorMsg: "Commission should be 2 digit"
    }
  };
};

export default yarnFormDetails;
