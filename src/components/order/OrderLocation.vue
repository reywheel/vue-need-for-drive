<template>
  <div class="location">
    <div class="location__header">
      <div class="location__row">
        <span>Город</span>
        <base-autocomplete
          v-model="location"
          :list="cityList"
          placeholder="Начните вводить город ..."
        />
      </div>
      <div class="location__row">
        <span>Пункт выдачи</span>
        <base-autocomplete
          v-model="point"
          :list="pointList"
          :isLoading="isPointListLoading"
          placeholder="Начните вводить пункт ..."
        />
      </div>
    </div>
    <div class="location__map">
      <span class="location__map-title">Выбрать на карте:</span>
      <div class="location__map-wrapper">
        <the-map
          :city="location"
          :point-list="pointList"
          @select="point = $event"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getterTypes as appGT, mutationTypes as appMT } from "@/store/app";
import { getterTypes as cityListGT } from "@/store/cityList";
import {
  actionTypes as pointListAT,
  getterTypes as pointListGT
} from "@/store/pointList";
import {
  getterTypes as orderGT,
  mutationTypes as orderMT
} from "@/store/order";
import TheMap from "@/components/TheMap";

export default {
  name: "OrderLocation",
  components: {
    TheMap
  },
  computed: {
    ...mapGetters({
      cityList: cityListGT.allCities,
      pointList: pointListGT.allPoints,
      isPointListLoading: pointListGT.isLoading,
      isPointListEmpty: pointListGT.isEmpty
    }),
    location: {
      get() {
        return this.$store.getters[appGT.location];
      },
      set(newLocation) {
        this.$store.commit(appMT.setLocation, newLocation);
      }
    },
    point: {
      get() {
        return this.$store.getters[orderGT.point];
      },
      set(newPoint) {
        this.$store.commit(orderMT.setPoint, newPoint);
      }
    }
  },
  watch: {
    location: {
      immediate: true,
      handler(newCity) {
        const cityId = newCity.id;
        this.fetchPointList({ cityId });
      }
    }
  },
  methods: {
    ...mapActions({
      fetchPointList: pointListAT.getPointListByCityId
    })
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
    color: $black;
  }
}

.location__map-title {
  display: block;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: $black;
  margin-bottom: 16px;
}

@media (max-width: 1100px) {
  .location {
    padding: 32px;
  }
}
</style>
