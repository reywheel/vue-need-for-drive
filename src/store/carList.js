export const getterTypes = {
  carList: "[car list] car list"
};

export const mutationTypes = {};

export const actionTypes = {};

const state = {
  carList: [
    {
      id: 1,
      title: "ELANTRA",
      price: "12 000 - 25 000 ₽",
      img: require("@/assets/car-1.jpg")
    },
    {
      id: 2,
      title: "i30 N",
      price: "10 000 - 32 000 ₽",
      img: require("@/assets/car-2.jpg")
    },
    {
      id: 3,
      title: "CRETA",
      price: "12 000 - 25 000 ₽",
      img: require("@/assets/car-3.jpg")
    },
    {
      id: 4,
      title: "SONATA",
      price: "10 000 - 32 000 ₽",
      img: require("@/assets/car-4.jpg")
    },
    {
      id: 5,
      title: "ELANTRA",
      price: "12 000 - 25 000 ₽",
      img: require("@/assets/car-1.jpg")
    },
    {
      id: 6,
      title: "i30 N",
      price: "10 000 - 32 000 ₽",
      img: require("@/assets/car-2.jpg")
    },
    {
      id: 7,
      title: "CRETA",
      price: "12 000 - 25 000 ₽",
      img: require("@/assets/car-3.jpg")
    },
    {
      id: 8,
      title: "SONATA",
      price: "10 000 - 32 000 ₽",
      img: require("@/assets/car-4.jpg")
    }
  ]
};

const getters = {
  [getterTypes.carList]: state => state.carList
};

const mutations = {};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
