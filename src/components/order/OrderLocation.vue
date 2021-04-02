<template>
  <div class="location">
    <div class="location__header">
      <div class="location__row">
        <span>Город</span>
        <base-autocomplete
          v-model="city"
          :list="cityList"
          placeholder="Начните вводить город ..."
        />
      </div>
      <div v-if="!isPointListLoading" class="location__row">
        <span>Пункт выдачи</span>
        <base-autocomplete
          placeholder="Начните вводить пункт ..."
          v-model="point"
          :list="pointList"
        />
      </div>
    </div>
    <div class="location__map">
      <span class="location__map-title">Выбрать на карте:</span>
      <the-map />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { getterTypes as appGT } from "@/store/app";
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
    ...mapGetters([orderGT.city, orderGT.point]),
    ...mapGetters({
      cityList: cityListGT.allCities,
      currentLocation: appGT.location,
      pointList: pointListGT.allPoints,
      isPointListLoading: pointListGT.isLoading
    }),
    city: {
      get() {
        return this[orderGT.city];
      },
      set(newCity) {
        this[orderMT.setCity](newCity);
      }
    },
    point: {
      get() {
        return this[orderGT.point];
      },
      set(newPoint) {
        this[orderMT.setPoint](newPoint);
      }
    }
  },
  watch: {
    city(newCity) {
      const cityId = newCity.id;
      this.fetchPointList({ cityId });
    }
  },
  methods: {
    ...mapMutations([orderMT.setCity, orderMT.setPoint]),
    ...mapActions({
      fetchPointList: pointListAT.getPointListByCityId
    })
  },
  mounted() {
    this[orderMT.setCity](this.currentLocation);
    this.fetchPointList({ cityId: this.city.id });
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
</style>
