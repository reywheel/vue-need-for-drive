<template>
  <div class="order">
    <div class="order__header">
      <router-link :to="{ name: 'main' }" v-slot="{ href, navigate }" custom>
        <a :href="href" class="order__logo" @click.prevent="navigate">
          Need for drive
        </a>
      </router-link>
      <div
        class="main__location"
        v-if="!isLocationSelectorShow"
        @click="isLocationSelectorShow = !isLocationSelectorShow"
      >
        <span class="main__location-text">{{ currentLocation }}</span>
      </div>
      <base-selector
        v-else
        v-model.trim="currentLocation"
        :list="locationList"
        placeholder="Начните вводить город..."
        @close="isLocationSelectorShow = !isLocationSelectorShow"
      />
    </div>
    <div class="order__bread-crumbs crumbs">
      <ul class="crumbs__list">
        <li class="crumbs__item crumbs__item--active">Местоположение</li>
        <li class="crumbs__item">Модель</li>
        <li class="crumbs__item">Дополнительно</li>
        <li class="crumbs__item">Итого</li>
      </ul>
      <the-crumbs />
    </div>
    <div class="order__wrapper">
      <div class="order__area">
        <router-view />
      </div>
      <div class="order__statement statement">
        <h3 class="statement__title">Ваш заказ:</h3>
        <div class="statement__pick-up">
          <div class="statement__pick-up-title">Пункт выдачи</div>
          <div class="statement__pick-up-divided"></div>
          <div class="statement__pick-up-address">
            <span class="statement__pick-up-city">Ульяновск,</span>
            Нариманова 42
          </div>
        </div>
        <div class="statement__price">
          <strong class="statement__price-title">Цена: </strong>
          <span class="statement__price-value">от 8 000 до 12 000 ₽</span>
        </div>
        <base-button disabled class="statement__button">
          Выбрать модель
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getterTypes, mutationTypes } from "@/store/app";
import { mapGetters, mapMutations } from "vuex";
import TheCrumbs from "@/components/TheCrumbs";

export default {
  name: "OrderPage",
  components: { TheCrumbs },
  data() {
    return {
      isLocationSelectorShow: false
    };
  },
  computed: {
    ...mapGetters({
      locationList: getterTypes.locationList,
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
.order {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.order__header {
  padding: 32px 64px;
  display: flex;
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
  color: #999999;
}

.order__bread-crumbs {
  padding: 8px 64px;
  border-bottom: 1px solid #eeeeee;
}

.crumbs__item {
  position: relative;
  display: inline-block;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: #999999;
  cursor: pointer;
  transition: all 0.3s;

  &--active {
    color: $accent;
  }

  &:not(:last-child) {
    padding-right: 22px;
    margin-right: 16px;

    &::before {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 8px;
      width: 6px;
      background: url("~@/assets/triangle-right.svg") no-repeat center;
      background-size: contain;
    }
  }
}

.order__wrapper {
  display: flex;
  flex-grow: 1;
}

.order__area {
  flex-grow: 1;
}

.order__statement {
  max-width: 384px;
  width: 100%;
  border-left: 1px solid #eeeeee;
  padding: 32px 63px 32px 32px;
}

.statement__title {
  text-align: right;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #121212;
  margin-bottom: 26px;
}

.statement__pick-up {
  display: flex;
  align-items: flex-end;
  margin-bottom: 32px;
}

.statement__pick-up-title {
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: #121212;
}

.statement__pick-up-divided {
  height: 5px;
  flex-grow: 1;
  border-top: 1px dotted #999999;

  margin: 0 12px;
}

.statement__pick-up-address {
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  color: #999999;
}

.statement__pick-up-city {
  display: block;
}

.statement__price {
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #121212;
  margin-bottom: 32px;
}

.statement__button {
  width: 100%;
}
</style>
