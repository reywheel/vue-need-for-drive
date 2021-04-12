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
      <span v-if="!isPeriodFilled" class="bid__price-value">
        от <nobr>{{ priceRange.min }}</nobr> до
        <nobr>{{ priceRange.max }} ₽</nobr>
      </span>
      <span v-else class="bid__price-value">
        <nobr>{{ priceToString(priceWithAdditionalServices) }} ₽</nobr>
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
      dateFrom: orderGT.dateFrom,
      dateTo: orderGT.dateTo,
      fullTank: orderGT.fullTank,
      babyChair: orderGT.babyChair,
      rightHandDrive: orderGT.rightHandDrive,

      isLocationFilled: orderGT.isLocationFilled,
      isModelFilled: orderGT.isModelFilled,
      isPeriodFilled: orderGT.isPeriodFilled
    }),

    bidRows() {
      return [
        {
          isVisible: this.isModelFilled,
          label: "Модель",
          value: this.model?.name
        },
        {
          isVisible: this.isPeriodFilled,
          label: "Цвет",
          value: this.color
        },
        {
          isVisible: this.isPeriodFilled,
          label: "Длительность аренды",
          value: this.leaseDuration
        },
        {
          isVisible: this.isPeriodFilled,
          label: "Тариф",
          value: this.tariff.rateTypeId?.name
        },
        {
          isVisible: this.isPeriodFilled && this.fullTank,
          label: "Полный бак",
          value: "Да"
        },
        {
          isVisible: this.isPeriodFilled && this.babyChair,
          label: "Детское кресло",
          value: "Да"
        },
        {
          isVisible: this.isPeriodFilled && this.rightHandDrive,
          label: "Правый руль",
          value: "Да"
        }
      ];
    },

    routeName() {
      return this.$route.name;
    },

    color() {
      return this.$store.getters[orderGT.color];
    },

    tariff() {
      return this.$store.getters[orderGT.tariff];
    },

    isModelPartVisible() {
      return (
        (this.routeName !== "orderModel" && this.isModelFilled) ||
        (this.routeName === "orderModel" && this.isModelFilled)
      );
    },

    isAdditionallyPartVisible() {
      return (
        (this.routeName !== "orderTotal" && this.isPeriodFilled) ||
        (this.routeName === "orderTotal" && this.isPeriodFilled)
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
            this.isLocationFilled && this.isModelFilled && this.isPeriodFilled,
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
    },

    priceRange() {
      if (!this.isModelFilled) {
        return {
          min: this.priceToString(8000),
          max: this.priceToString(12000)
        };
      } else {
        return {
          min: this.priceToString(this.model.priceMin),
          max: this.priceToString(this.model.priceMax)
        };
      }
    },

    timeDifference() {
      const timeDifference = this.dateTo - this.dateFrom;
      return timeDifference > 0 ? timeDifference : 0;
    },

    leaseDuration() {
      const oneHours = 1000 * 60 * 60;
      const oneDay = 1000 * 60 * 60 * 24;
      const days = Math.floor((this.timeDifference + oneHours) / oneDay);
      const hoursRest = this.timeDifference - days * oneDay;
      const hours = Math.ceil(hoursRest / oneHours);
      return `${days}д ${hours}ч`;
    },

    tariffPrice() {
      const dividers = [
        {
          unit: "сутки",
          value: 1000 * 60 * 60 * 24
        },
        {
          unit: "7 дней",
          value: 1000 * 60 * 60 * 24 * 7
        },
        {
          unit: "мин",
          value: 1000 * 60
        }
      ];

      const divider = dividers.find(
        divider => this.tariff.rateTypeId.unit === divider.unit
      );

      let totalPrice =
        Math.ceil(this.timeDifference / divider.value) * this.tariff.price;
      return totalPrice;
    },

    priceWithAdditionalServices() {
      let addedPrice = 0;
      const prices = {
        fullTank: 500,
        babyChair: 200,
        rightHandDrive: 1600
      };

      this.fullTank ? (addedPrice += prices.fullTank) : null;
      this.babyChair ? (addedPrice += prices.babyChair) : null;
      this.rightHandDrive ? (addedPrice += prices.rightHandDrive) : null;

      return this.tariffPrice + addedPrice;
    }
  },

  methods: {
    priceToString(price) {
      const str = String(price);
      const start = str.slice(0, str.length - 3);
      const end = str.slice(-3);
      return `${start}  ${end}`;
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
