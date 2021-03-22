<template>
  <div class="location">
    <div class="location__header">
      <div class="location__row">
        <span>Город</span>
        <AppSelector
          v-model.trim="currentLocation"
          :list="locationList"
          placeholder="Начните вводить город ..."
        />
      </div>
      <div class="location__row">
        <span>Пункт выдачи</span>
        <AppSelector
          placeholder="Начните вводить пункт ..."
          v-model.trim="pickPoint"
          :list="pickPointsList"
        />
      </div>
    </div>
    <div class="location__map">
      <span class="location__map-title">Выбрать на карте:</span>
      <img src="@/assets/map.jpg" alt="" class="location__map-img" />
    </div>
  </div>
</template>

<script>
import AppSelector from "@/components/Selector";
import { getterTypes, mutationTypes } from "@/store/app";
import { mapGetters } from "vuex";

export default {
  name: "StepOne",
  components: {
    AppSelector
  },
  data() {
    return {
      pickPoint: ""
    };
  },
  computed: {
    ...mapGetters({
      locationList: getterTypes.locationList,
      pickPointsList: getterTypes.pickPointsList
    }),
    currentLocation: {
      get() {
        return this.$store.getters[getterTypes.location];
      },
      set(newLocation) {
        this.$store.commit(mutationTypes.setLocation, newLocation);
      }
    }
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
  justify-content: flex-end;
  min-width: 320px;
  width: 0;
  margin-bottom: 13px;

  span {
    display: inline-block;
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
