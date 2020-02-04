const validationFunction = (obj, value, confirm) => {
  let error = false;
  if (value.length < obj.minLength && obj.minLength) {
    error = error || true;
  }
  if (value.length !== obj.fixedLength && obj.fixedLength) {
    error = error || true;
  }
  if (obj.isEmail) {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!pattern.test(value)) {
      error = error || true;
    }
  }

  if (obj.isSame && confirm) {
    if (value != confirm) {
      error = error || true;
    }
  }

  return error;
};

export default validationFunction;
