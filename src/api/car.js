import axios from "@/api/axios";

const getAll = () => {
  return axios.get("db/car").then(response => response.data);
};

export default {
  getAll
};
