<template>
  <div class="bid">
    <h3 class="bid__title">Ваш заказ:</h3>
    <!--   пукнт выдачи   -->
    <div class="bid__pick-up bid__row">
      <div class="bid__row-title">Пункт выдачи</div>
      <div class="bid__row-divided"></div>
      <div class="bid__row-value">
        <span class="bid__pick-up-city">{{ city.name }},</span>
        {{ pickUpPoint }}
      </div>
    </div>
    <!--   модель автомобиля   -->
    <div v-if="isModelPartVisible" class="bid__model bid__row">
      <div class="bid__row-title">Модель</div>
      <div class="bid__row-divided"></div>
      <div class="bid__row-value">Hyndai, {{ model }}</div>
    </div>

    <template v-if="isAdditionallyPartVisible">
      <!--   цвет автомобиля   -->
      <div class="bid__color bid__row">
        <div class="bid__row-title">Цвет</div>
        <div class="bid__row-divided"></div>
        <div class="bid__row-value">{{ color }}</div>
      </div>
      <!--   длительность аренды   -->
      <div class="bid__duration bid__row">
        <div class="bid__row-title">Длительность аренды</div>
        <div class="bid__row-divided"></div>
        <div class="bid__row-value">1д 2ч</div>
      </div>
      <!--   тариф аренды   -->
      <div class="bid__tariff bid__row">
        <div class="bid__row-title">Тариф</div>
        <div class="bid__row-divided"></div>
        <div class="bid__row-value">{{ tariff }}</div>
      </div>
      <!--   полный бак   -->
      <div v-if="fullTank" class="bid__tariff bid__row">
        <div class="bid__row-title">Полный бак</div>
        <div class="bid__row-divided"></div>
        <div class="bid__row-value">Да</div>
      </div>
      <!--   детское кресло   -->
      <div v-if="babyChair" class="bid__baby-chair bid__row">
        <div class="bid__row-title">Детское кресло</div>
        <div class="bid__row-divided"></div>
        <div class="bid__row-value">Да</div>
      </div>
      <!--   правый руль   -->
      <div v-if="rightHandDrive" class="bid__baby-chair bid__row">
        <div class="bid__row-title">Правый руль</div>
        <div class="bid__row-divided"></div>
        <div class="bid__row-value">Да</div>
      </div>
    </template>

    <div class="bid__price">
      <strong class="bid__price-title">Цена: </strong>
      <span class="bid__price-value">от 8 000 до 12 000 ₽</span>
    </div>
    <router-link
      :to="{ name: this.nextRouteName }"
      v-slot="{ navigate }"
      custom
    >
      <base-button
        :disabled="!isButtonAllowed"
        class="bid__button"
        @click="navigate"
      >
        {{ buttonText }}
      </base-button>
    </router-link>
  </div>
</template>

<script>
import { getterTypes as orderGT } from "@/store/order";
import { COLORS, TARIFFS } from "@/store/order";
import { getterTypes as carListGT } from "@/store/carList";
import { mapGetters } from "vuex";

export default {
  name: "TheBid",
  computed: {
    ...mapGetters([orderGT.color, orderGT.tariff]),
    ...mapGetters({
      city: orderGT.city,
      carId: orderGT.carId,
      carList: carListGT.carList,
      fullTank: orderGT.fullTank,
      babyChair: orderGT.babyChair,
      rightHandDrive: orderGT.rightHandDrive,

      isLocationFilled: orderGT.isLocationFilled,
      isModelFilled: orderGT.isModelFilled,
      isAdditionallyFilled: orderGT.isAdditionallyFilled
    }),
    routeName() {
      return this.$route.name;
    },
    model() {
      return this.carId
        ? this.carList.filter(car => car.id === this.carId)[0].title
        : null;
    },
    color() {
      return COLORS[this[orderGT.color]];
    },
    tariff() {
      return TARIFFS[this[orderGT.tariff]];
    },
    isModelPartVisible() {
      return (
        (this.routeName !== "orderModel" && this.isModelFilled) ||
        (this.routeName === "orderModel" && this.isModelFilled)
      );
    },
    isAdditionallyPartVisible() {
      return (
        (this.routeName !== "orderAdditionally" && this.isAdditionallyFilled) ||
        (this.routeName === "orderAdditionally" && this.isAdditionallyFilled)
      );
    },
    buttonText() {
      switch (this.$route.name) {
        case "orderLocation":
          return "Выбрать модель";
        case "orderModel":
          return "Дополнительно";
        case "orderAdditionally":
          return "Итого";
        case "orderTotal":
          return "Заказать";
        default:
          return "Следующий шаг";
      }
    },
    isButtonAllowed() {
      switch (this.$route.name) {
        case "orderLocation":
          return this.isLocationFilled;
        case "orderModel":
          return this.isLocationFilled && this.isModelFilled;
        case "orderAdditionally":
          return (
            this.isLocationFilled &&
            this.isModelFilled &&
            this.isAdditionallyFilled
          );
        case "orderTotal":
          return true;
        default:
          return false;
      }
    },
    nextRouteName() {
      switch (this.$route.name) {
        case "orderLocation":
          return "orderModel";
        case "orderModel":
          return "orderAdditionally";
        case "orderAdditionally":
          return "orderTotal";
        case "orderTotal":
          return "order";
        default:
          return "orderLocation";
      }
    }
  },
  methods: {
    clickHandler() {
      console.log("click");
    }
  }
};
</script>

<style scoped lang="scss">
.bid {
  padding: 32px 63px 32px 32px;
}

.bid__title {
  text-align: right;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #121212;
  margin-bottom: 26px;
}

.bid__row {
  display: flex;
  align-items: flex-end;
  margin-bottom: 16px;
}

.bid__row-title {
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: #121212;
}

.bid__row-divided {
  height: 5px;
  flex-grow: 1;
  border-top: 1px dotted #999999;

  margin: 0 12px;
}

.bid__row-value {
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  color: #999999;
}

.bid__pick-up-city {
  display: block;
}

.bid__price {
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #121212;
  margin: 32px 0;
}

.bid__button {
  width: 100%;
}
</style>
