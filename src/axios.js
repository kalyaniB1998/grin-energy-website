import axios from "axios";

const instance = axios.create({
  baseURL: "https://grin-backend.onrender.com",
});

export default instance;
