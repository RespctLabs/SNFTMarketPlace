import axios from "axios";

// a function that makes an axios calling
export const checkValidity = (url, method) => {
  let Value = null;
  axios({
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    method: method,
    url: url,
  })
    .then((response) => {
      Value = response.data;
      console.log(response);
      console.log(response.data);

      if (response.data === "true") {
        console.log(
          "heemankverma has tweeted about Respct.club, he can now be allowed to upgrade his nft"
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return Value;
};
