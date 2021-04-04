import Echo from "laravel-echo";

import api from "./api";

window.Pusher = require("pusher-js");

const echo = new Echo({
  broadcaster: "pusher",
  key: process.env.REACT_APP_PUSHER_KEY,
  forceTLS: process.env.REACT_APP_PUSHER_TLS,
  encrypted: process.env.REACT_APP_PUSHER_TLS,
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  authorizer: (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        api
          .post("/api/broadcasting/auth", {
            socket_id: socketId,
            channel_name: channel.name,
          })
          .then((response) => {
            callback(false, response.data);
          })
          .catch((error) => {
            callback(true, error);
          });
      },
    };
  },
});

export default echo;
