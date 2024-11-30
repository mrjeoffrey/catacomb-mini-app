import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://reliably-wired-goat.ngrok-free.app/api", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
