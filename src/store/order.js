export const getterTypes = {
  point: "[order] point",
  car: "[order] car",
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
  isPeriodFilled: "[order] is period filled"
};

export const mutationTypes = {
  setPoint: "[order] set point",
  setCar: "[order] set car",
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
  point: null,
  car: null,
  color: "Любой",
  dateFrom: null,
  dateTo: null,
  tariff: "На сутки",
  fullTank: false,
  babyChair: false,
  rightHandDrive: false,
  dateList: ["1", "2", "3", "4", "5"]
};

const getters = {
  [getterTypes.point]: state => state.point,
  [getterTypes.car]: state => state.car,
  [getterTypes.color]: state => state.color,
  [getterTypes.dateFrom]: state => state.dateFrom,
  [getterTypes.dateTo]: state => state.dateTo,
  [getterTypes.tariff]: state => state.tariff,
  [getterTypes.fullTank]: state => state.fullTank,
  [getterTypes.babyChair]: state => state.babyChair,
  [getterTypes.rightHandDrive]: state => state.rightHandDrive,

  [getterTypes.dateList]: state => state.dateList,

  [getterTypes.isLocationFilled]: state => state.point,
  [getterTypes.isModelFilled]: state => state.car !== null,
  [getterTypes.isPeriodFilled]: state =>
    state.dateFrom && state.dateTo && state.dateTo - state.dateFrom > 0
};

const mutations = {
  [mutationTypes.setPoint](state, newPoint) {
    state.point = newPoint;
  },
  [mutationTypes.setCar](state, car) {
    state.car = car;
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
