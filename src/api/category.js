import axios from "@/api/axios";

const getAll = () => {
  return axios.get("db/category").then(response => response.data);
};

export default {
  getAll
};
