import axios from "@/api/axios";

const getByCityId = cityId => {
  return axios
    .get(`db/point?cityId[id]=${cityId}`)
    .then(response => response.data);
};

export default {
  getByCityId
};
