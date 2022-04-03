import axios from "axios";

// a function that makes an axios calling
export const checkValidity = (url, method) => {
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
      console.log(response);
      console.log(response.data);

      if (response.data.value) {
        console.log(
          "heemankverma has tweeted about Respct.club, he can now be allowed to upgrade his nft"
        );
      }
      return response.data.value;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};
