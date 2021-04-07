import axios from "axios";
import { addError } from "@/main";

const isDevelopment = process.env.NODE_ENV === "development";

const instance = axios.create({
  baseURL: isDevelopment
    ? process.env.VUE_APP_LOCAL_HOST
    : process.env.VUE_APP_API_URL,
  headers: {
    "X-Api-Factory-Application-Id": process.env.VUE_APP_APPLICATION_ID
  }
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status >= 500) {
      addError(
        "Не удалось получить ответ от сервера. Попробуйте перезагрузить страницу"
      );
    }
    return error;
  }
);

export default instance;
