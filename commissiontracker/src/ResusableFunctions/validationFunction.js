const validationFunction = (obj, value) => {
  let error = false;
  if (value.length < obj.minLength && obj.minLength) {
    error = error || true;
    // console.log("Checking minLen", error);
  }
  if (value.length !== obj.fixedLength && obj.fixedLength) {
    // console.log("in fixed length");
    error = error || true;
  }
  return error;
};

export default validationFunction;
