export const COLORS = {
  any: "Любой",
  red: "Красный",
  blue: "Голубой"
};

export const TARIFFS = {
  minuteByMinute: "Поминутно",
  forADay: "На сутки"
};

export const getterTypes = {
  city: "[order] city",
  point: "[order] point",
  carId: "[order] car id",
  color: "[order] color",
  dateFrom: "[order] date from",
  dateTo: "[order] date to",
  tariff: "[order] tariff",
  fullTank: "[order] full tank",
  babyChair: "[order] baby chair",
  rightHandDrive: "[order] right hand drive",

  dateList: "[order] date list",

  isLocationFilled: "[order] is location filled",
  isModelFilled: "[order] is model filled",
  isAdditionallyFilled: "[order] is additionally filled"
};

export const mutationTypes = {
  setCity: "[order] set city",
  setPoint: "[order] set point",
  setCarId: "[order] set car id",
  setColor: "[order] set color",
  setDateFrom: "[order] set date from",
  setDateTo: "[order] set date to",
  setTariff: "[order] set tariff",
  setFullTank: "[order] set full tank",
  setBabyChair: "[order] set baby chair",
  setRightHandDrive: "[order] set right hand drive"
};

export const actionTypes = {};

const state = {
  city: null,
  point: null,
  carId: null,
  color: "any",
  dateFrom: null,
  dateTo: null,
  tariff: "minuteByMinute",
  fullTank: false,
  babyChair: false,
  rightHandDrive: false,
  dateList: ["1", "2", "3", "4", "5"]
};

const getters = {
  [getterTypes.city]: state => state.city,
  [getterTypes.point]: state => state.point,
  [getterTypes.carId]: state => state.carId,
  [getterTypes.color]: state => state.color,
  [getterTypes.dateFrom]: state => state.dateFrom,
  [getterTypes.dateTo]: state => state.dateTo,
  [getterTypes.tariff]: state => state.tariff,
  [getterTypes.fullTank]: state => state.fullTank,
  [getterTypes.babyChair]: state => state.babyChair,
  [getterTypes.rightHandDrive]: state => state.rightHandDrive,

  [getterTypes.dateList]: state => state.dateList,

  [getterTypes.isLocationFilled]: state => state.city && state.pickUpPoint,
  [getterTypes.isModelFilled]: state => state.carId !== null,
  [getterTypes.isAdditionallyFilled]: state => state.dateFrom && state.dateTo
};

const mutations = {
  [mutationTypes.setCity](state, newCity) {
    state.city = newCity;
  },
  [mutationTypes.setPoint](state, newPoint) {
    state.point = newPoint;
  },
  [mutationTypes.setCarId](state, carId) {
    state.carId = carId;
  },
  [mutationTypes.setColor](state, color) {
    state.color = color;
  },
  [mutationTypes.setDateFrom](state, dateFrom) {
    state.dateFrom = dateFrom;
  },
  [mutationTypes.setDateTo](state, dateTo) {
    state.dateTo = dateTo;
  },
  [mutationTypes.setTariff](state, tariff) {
    state.tariff = tariff;
  },
  [mutationTypes.setFullTank](state, fullTank) {
    state.fullTank = fullTank;
  },
  [mutationTypes.setBabyChair](state, babyChair) {
    state.babyChair = babyChair;
  },
  [mutationTypes.setRightHandDrive](state, rightHandDrive) {
    state.rightHandDrive = rightHandDrive;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
