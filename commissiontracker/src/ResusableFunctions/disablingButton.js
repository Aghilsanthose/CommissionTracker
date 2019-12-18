const disablingButton = obj => {
  //   console.log("in Disabling btton", obj);
  const tempArr = [];
  for (let key in obj) {
    tempArr.push(obj[key]);
  }

  //   console.log(
  //     "filter",
  //     tempArr.filter(element => {
  //       return element.error === true || element.value.length === 0;
  //     })
  //   );

  return (
    tempArr.filter(element => {
      return element.error === true || element.value.length === 0;
    }).length === 0
  );
};

export default disablingButton;
