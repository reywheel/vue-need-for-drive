<template>
  <div class="total">
    <div class="total___info">
      <div v-if="routeName === 'order'" class="total__order-title">
        Ваш заказ подтверждён
      </div>
      <div class="total__info-title">Hyndai, i30 N</div>
      <div class="total__info-number">K 761 HA 73</div>
      <div class="total__info-fuel"><strong>Топливо </strong>100%</div>
      <div class="total__info-date">
        <strong>Доступна с</strong> 12.06.2019 12:00
      </div>
    </div>
    <div>
      <img :src="car.img" class="total__img" />
    </div>
  </div>
</template>

<script>
import { getterTypes as carListGT } from "@/store/carList";
import { getterTypes as orderGT } from "@/store/order";
import { mapGetters } from "vuex";

export default {
  name: "OrderTotal",
  props: {
    id: {
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      carList: carListGT.carList,
      selectedCarId: orderGT.carId
    }),
    car() {
      return this.carList.filter(car => car.id === this.selectedCarId)[0];
    },
    routeName() {
      return this.$route.name;
    }
  }
};
</script>

<style scoped lang="scss">
.total {
  padding: 32px 192px 32px 64px;
  display: flex;
  justify-content: space-between;
}

.total___info {
  & > * {
    margin-bottom: 8px;
  }
}

.total__order-title {
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  color: $black;
}

.total__info-title {
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: $black;
}

.total__info-number {
  display: inline-block;
  padding: 4px 8px;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: $black;
  border: 1px solid $dark-grey;
  border-radius: 4px;
}

.total__info-fuel,
.total__info-date {
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;

  color: $black;

  strong {
    font-weight: bold;
  }
}
</style>
