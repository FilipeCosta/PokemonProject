import axios from "axios";

const axiosConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
};

const http = axios.create(axiosConfig);

export default http;
