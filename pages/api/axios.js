import axios from "axios";

// a function that makes an axios calling
export const checkValidity = (url, method) => {
  let Value = null;

  while (Value === null) {
    axios({
      method: method,
      url: url,
    })
      .then((response) => {
        Value = response.data;
        console.log(response);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return Value;
};
