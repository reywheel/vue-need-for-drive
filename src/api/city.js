import axios from "@/api/axios";

const getAll = () => {
  return axios.get("db/city").then(response => response.data);
};

export default {
  getAll
};
