import axios from "axios";

// a function that makes an axios calling
export const checkValidity = (url, method) => {
  let value = 0;
  axios({
    headers: {
      // need to resolve cross origin
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    method: method,
    url: url,
  })
    .then((response) => {
      value = response.data.status;
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  return value;
};
