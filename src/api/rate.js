import axios from "@/api/axios";

const getAll = () => {
  return axios.get("db/rate").then(response => response.data);
};

export default {
  getAll
};
