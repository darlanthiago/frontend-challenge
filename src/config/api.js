import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    accept: "application/json",
  },
});

api.defaults.withCredentials = true;

// api.interceptors.response.use(
//   function (response) {
//     // Call was successful, don't do anything special.
//     return response;
//   },
//   function (error) {
//     switch (error.response.status) {
//       case 401:
//         console.log(error.response.status);
//       case 419: // Session expired
//         break;
//       case 500:
//         alert("Oops, something went wrong!  The team have been notified.");
//         break;
//       default:
//         // Allow individual requests to handle other errors
//         return Promise.reject(error);
//     }
//   }
// );

export default api;
