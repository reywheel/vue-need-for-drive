<template>
  <div class="bid">
    <h3 class="bid__title">Ваш заказ:</h3>
    <div class="bid__pick-up">
      <div class="bid__pick-up-title">Пункт выдачи</div>
      <div class="bid__pick-up-divided"></div>
      <div class="bid__pick-up-address">
        <span class="bid__pick-up-city">{{ city }},</span>
        {{ pickUpPoint }}
      </div>
    </div>
    <div class="bid__price">
      <strong class="bid__price-title">Цена: </strong>
      <span class="bid__price-value">от 8 000 до 12 000 ₽</span>
    </div>
    <router-link :to="{ name: 'orderModel' }">
      <base-button :disabled="!isButtonAllowed" class="bid__button">
        {{ buttonText }}
      </base-button>
    </router-link>
  </div>
</template>

<script>
import { getterTypes } from "@/store/order";
import { mapGetters } from "vuex";

export default {
  name: "TheBid",
  computed: {
    ...mapGetters({
      city: getterTypes.city,
      pickUpPoint: getterTypes.pickUpPoint,
      isLocationFilled: getterTypes.isLocationFilled
    }),
    buttonText() {
      switch (this.$route.name) {
        case "orderLocation":
          return "Выбрать модель";
        case "orderModel":
          return "Дополнительно";
        default:
          return "Следующий шаг";
      }
    },
    isButtonAllowed() {
      switch (this.$route.name) {
        case "orderLocation":
          return this.isLocationFilled;
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
        default:
          return "Следующий шаг";
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

.bid__pick-up {
  display: flex;
  align-items: flex-end;
  margin-bottom: 32px;
}

.bid__pick-up-title {
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: #121212;
}

.bid__pick-up-divided {
  height: 5px;
  flex-grow: 1;
  border-top: 1px dotted #999999;

  margin: 0 12px;
}

.bid__pick-up-address {
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
  margin-bottom: 32px;
}

.bid__button {
  width: 100%;
}
</style>
