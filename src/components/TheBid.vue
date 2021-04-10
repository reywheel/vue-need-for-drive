<template>
  <div class="bid">
    <h3 class="bid__title">Ваш заказ:</h3>

    <app-bid-row>
      <template v-slot:label>Пункт выдачи</template>
      <template v-slot:value>
        <div>{{ city.name }},</div>
        {{ point.name }}
      </template>
    </app-bid-row>

    <app-bid-row
      v-for="(row, index) of bidRows"
      v-show="row.isVisible"
      :key="index"
    >
      <template v-slot:label>{{ row.label }}</template>
      <template v-slot:value>{{ row.value }}</template>
    </app-bid-row>

    <div class="bid__price">
      <strong class="bid__price-title">Цена: </strong>
      <span class="bid__price-value">
        от <nobr>8 000</nobr> до <nobr>12 000 ₽</nobr>
      </span>
    </div>

    <router-link
      :to="{ name: currentButtonParam.nextRouteName }"
      v-slot="{ navigate }"
      custom
    >
      <base-button
        :disabled="!currentButtonParam.isAllowed"
        class="bid__button"
        @click="navigate"
      >
        {{ currentButtonParam.text }}
      </base-button>
    </router-link>
  </div>
</template>

<script>
import { getterTypes as appGT } from "@/store/app";
import { getterTypes as orderGT } from "@/store/order";
import { COLORS, TARIFFS } from "@/store/order";
import { getterTypes as carListGT } from "@/store/carList";
import { mapGetters } from "vuex";
import AppBidRow from "@/components/BidRow";

export default {
  name: "TheBid",
  components: {
    AppBidRow
  },
  computed: {
    ...mapGetters({
      city: appGT.location,
      point: orderGT.point,
      model: orderGT.car,
      carList: carListGT.carList,
      fullTank: orderGT.fullTank,
      babyChair: orderGT.babyChair,
      rightHandDrive: orderGT.rightHandDrive,

      isLocationFilled: orderGT.isLocationFilled,
      isModelFilled: orderGT.isModelFilled,
      isAdditionallyFilled: orderGT.isAdditionallyFilled
    }),
    bidRows() {
      return [
        {
          isVisible: this.isModelPartVisible,
          label: "Модель",
          value: this.model?.name
        },
        {
          isVisible: this.isAdditionallyPartVisible,
          label: "Цвет",
          value: this.color
        },
        {
          isVisible: this.isAdditionallyPartVisible,
          label: "Длительность аренды",
          value: "1д 2ч"
        },
        {
          isVisible: this.isAdditionallyPartVisible,
          label: "Тариф",
          value: this.tariff
        },
        {
          isVisible: this.isAdditionallyPartVisible && this.fullTank,
          label: "Полный бак",
          value: "Да"
        },
        {
          isVisible: this.isAdditionallyPartVisible && this.babyChair,
          label: "Детское кресло",
          value: "Да"
        },
        {
          isVisible: this.isAdditionallyPartVisible && this.rightHandDrive,
          label: "Правый руль",
          value: "Да"
        }
      ];
    },
    routeName() {
      return this.$route.name;
    },
    color() {
      return COLORS[this.$store.getters[orderGT.color]];
    },
    tariff() {
      return TARIFFS[this.$store.getters[orderGT.tariff]];
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
    buttonParams() {
      return [
        {
          routeName: "orderLocation",
          text: "Выбрать модель",
          isAllowed: this.isLocationFilled,
          nextRouteName: "orderModel"
        },
        {
          routeName: "orderModel",
          text: "Дополнительно",
          isAllowed: this.isLocationFilled && this.isModelFilled,
          nextRouteName: "orderAdditionally"
        },
        {
          routeName: "orderAdditionally",
          text: "Итого",
          isAllowed:
            this.isLocationFilled &&
            this.isModelFilled &&
            this.isAdditionallyFilled,
          nextRouteName: "orderTotal"
        },
        {
          routeName: "orderTotal",
          text: "Заказать",
          isAllowed: true,
          nextRouteName: "order"
        }
      ];
    },
    currentButtonParam() {
      return this.buttonParams.find(
        param => param.routeName === this.routeName
      );
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

@media (max-width: 1100px) {
  .bid {
    padding: 32px;
  }
}
</style>
