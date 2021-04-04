<template>
  <div class="order">
    <div class="order__header">
      <router-link :to="{ name: 'main' }" class="order__logo">
        Need for drive
      </router-link>
      <div
        class="main__location"
        v-if="!isLocationSelectorShow"
        @click="isLocationSelectorShow = !isLocationSelectorShow"
      >
        <span class="main__location-text">{{ currentLocation.name }}</span>
      </div>
      <base-autocomplete
        v-else
        v-model="currentLocation"
        :list="locationList"
        placeholder="Начните вводить город..."
        @select="isLocationSelectorShow = !isLocationSelectorShow"
        @outside-click="isLocationSelectorShow = !isLocationSelectorShow"
      />
    </div>
    <div class="order__bread-crumbs crumbs">
      <div v-if="routeName === 'order'" class="order__id">
        Заказ номер RU{{ id }}
      </div>
      <the-crumbs v-else />
    </div>
    <div class="order__wrapper">
      <div class="order__area">
        <router-view />
      </div>

      <div class="order__statement">
        <the-bid />
      </div>
    </div>
  </div>
</template>

<script>
import { mutationTypes as appMT, getterTypes as appGT } from "@/store/app";
import { getterTypes as cityListGT } from "@/store/cityList";
import { mapGetters, mapMutations } from "vuex";
import TheCrumbs from "@/components/TheCrumbs";
import TheBid from "@/components/TheBid";

export default {
  name: "OrderPage",
  components: { TheCrumbs, TheBid },
  props: {
    id: {
      type: Number
    }
  },
  data() {
    return {
      isLocationSelectorShow: false
    };
  },
  computed: {
    ...mapGetters({
      locationList: cityListGT.allCities,
      location: appGT.location
    }),
    currentLocation: {
      get() {
        return this.location;
      },
      set(newLocation) {
        this[appMT.setLocation](newLocation);
      }
    },
    routeName() {
      return this.$route.name;
    }
  },
  methods: {
    ...mapMutations([appMT.setLocation])
  }
};
</script>

<style scoped lang="scss">
.order {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.order__header {
  padding: 32px 64px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
}

.order__logo {
  font-weight: bold;
  font-size: 30px;
  line-height: 35px;
  color: $accent;
  text-decoration: none;
}

.order__id {
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: $black;
}

.main__location {
  position: relative;
  padding: 3px 0 3px 24px;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 20px;
    background-image: url("~@/assets/Group.svg");
  }
}

.main__location-text {
  font-size: 14px;
  line-height: 16px;
  color: $dark-grey;
}

.order__bread-crumbs {
  padding: 8px 64px;
  border-bottom: 1px solid #eeeeee;
}

.order__wrapper {
  display: flex;
  flex-grow: 1;
}

.order__area {
  flex-grow: 1;
}

.order__statement {
  width: 384px;
  border-left: 1px solid #eeeeee;
}

@media (max-width: 1100px) {
  .order__wrapper {
    flex-direction: column-reverse;
  }

  .order__statement {
    width: unset;
  }
}

@media (max-width: 600px) {
  .order__header {
    flex-direction: column;
  }

  .order__logo {
    margin-bottom: 15px;
  }
}
</style>
