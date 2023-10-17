// pusher.config.ts

import Pusher from "pusher-js";
const token = JSON.parse(localStorage.getItem("token"));
const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  authEndpoint: `http://localhost:8000/api/broadcasting/auth`,
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
  authTransport: "ajax",
  // Add other options if needed
});

export default pusher;
