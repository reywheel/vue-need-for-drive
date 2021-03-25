<template>
  <div class="location">
    <div class="location__header">
      <div class="location__row">
        <span>Город</span>
        <base-selector
          v-model.trim="city"
          :list="locationList"
          placeholder="Начните вводить город ..."
        />
      </div>
      <div class="location__row">
        <span>Пункт выдачи</span>
        <base-selector
          placeholder="Начните вводить пункт ..."
          v-model.trim="pickUpPoint"
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
import { getterTypes as appGetterTypes } from "@/store/app";
import {
  getterTypes as orderGetterTypes,
  mutationTypes as orderMutationTypes
} from "@/store/order";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "StepOne",
  computed: {
    ...mapGetters({
      locationList: appGetterTypes.locationList,
      pickPointsList: orderGetterTypes.pickUpPointsList,
      currentLocation: appGetterTypes.location
    }),
    city: {
      get() {
        return this.$store.getters[orderGetterTypes.city];
      },
      set(newCity) {
        this[orderMutationTypes.setCity](newCity);
      }
    },
    pickUpPoint: {
      get() {
        return this.$store.getters[orderGetterTypes.pickUpPoint];
      },
      set(newPickUpPoint) {
        this[orderMutationTypes.setPickUpPoint](newPickUpPoint);
      }
    }
  },
  methods: {
    ...mapMutations([
      orderMutationTypes.setCity,
      orderMutationTypes.setPickUpPoint
    ])
  },
  mounted() {
    this[orderMutationTypes.setCity](this.currentLocation);
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
