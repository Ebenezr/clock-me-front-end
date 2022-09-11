import axios from "axios";

//fetch data
export const axiosRequest = axios.create({
  baseURL: "https://clock-me-server.herokuapp.com/",
});
