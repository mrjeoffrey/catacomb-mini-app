import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://bot-api.catacomb.fyi/api", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
