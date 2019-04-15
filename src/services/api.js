import axios from "axios";

const api = axios.create({
  baseURL: 'https://dropbox-api-nodejs.herokuapp.com',
});

export default api;
