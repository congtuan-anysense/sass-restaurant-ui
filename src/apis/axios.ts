import axios from "axios";

const AXIOS = axios.create({
  baseURL: process.env.API_BASE_URL,
});

export default AXIOS;
