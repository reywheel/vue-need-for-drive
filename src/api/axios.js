import axios from "axios";

const isDevelopment = process.env.NODE_ENV === "development";

const instance = axios.create({
  baseURL: isDevelopment
    ? process.env.VUE_APP_LOCAL_HOST
    : process.env.VUE_APP_API_URL,
  headers: {
    "X-Api-Factory-Application-Id": process.env.VUE_APP_APPLICATION_ID
  }
});

export default instance;
