<template>
  <div class="location">
    <div class="location__header">
      <div class="location__row">
        <span>Город</span>
        <base-selector
          v-model.trim="currentLocation"
          :list="locationList"
          placeholder="Начните вводить город ..."
        />
      </div>
      <div class="location__row">
        <span>Пункт выдачи</span>
        <base-selector
          placeholder="Начните вводить пункт ..."
          v-model.trim="pickPoint"
          :list="pickPointsList"
        />
      </div>
    </div>
    <div class="location__map">
      <span class="location__map-title">Выбрать на карте:</span>
      <img
        :src="require('@/assets/map.jpg')"
        alt=""
        class="location__map-img"
      />
    </div>
  </div>
</template>

<script>
import { getterTypes, mutationTypes } from "@/store/app";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "StepOne",
  data() {
    return {
      pickPoint: ""
    };
  },
  computed: {
    ...mapGetters({
      locationList: getterTypes.locationList,
      pickPointsList: getterTypes.pickPointsList,
      location: getterTypes.location
    }),
    currentLocation: {
      get() {
        return this.location;
      },
      set(newLocation) {
        this[mutationTypes.setLocation](newLocation);
      }
    }
  },
  methods: {
    ...mapMutations([mutationTypes.setLocation])
  }
};
</script>

<style scoped lang="scss">
.location {
  padding: 32px 64px;
}

.location__header {
  margin-bottom: 45px;
}

.location__row {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: flex-start;
  margin-bottom: 13px;

  span {
    display: inline-block;
    text-align: right;
    min-width: 95px;
    margin-right: 5px;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: #121212;
  }
}

.location__map-title {
  display: block;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: #121212;
  margin-bottom: 16px;
}
</style>
