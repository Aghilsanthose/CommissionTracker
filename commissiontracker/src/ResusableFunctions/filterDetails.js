const filterData = () => {
  return {
    buyerName: {
      id: "buyerName",
      elementType: "select",
      elementConfig: {
        label: "Buyer Name",
        name: "buyerName"
      },
      options: [],
      value: ""
    },
    sellerName: {
      id: "sellerName",
      elementType: "select",
      elementConfig: {
        label: "Seller Name",
        name: "sellerName"
      },
      options: [],
      value: ""
    },
    paymentStatus: {
      id: "paymentStatus",
      elementType: "select",
      elementConfig: {
        label: "Payment Status",
        name: "paymentStatus"
      },
      options: [
        { value: "PENDING", label: "PENDING" },
        { value: "PAID", label: "PAID" }
      ],
      value: ""
    }
  };
};

export default filterData;
