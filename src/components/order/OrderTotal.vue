<template>
  <div class="total">
    <div class="total__info">
      <div v-if="routeName === 'order'" class="total__order-title">
        Ваш заказ подтверждён
      </div>
      <div class="total__info-title">{{ selectedCar.name }}</div>
      <div v-if="selectedCar.number" class="total__info-number">
        {{ selectedCar.number }}
      </div>
      <div v-if="isFinite(selectedCar.tank)" class="total__info-fuel">
        <strong>Топливо </strong>{{ selectedCar.tank }}%
      </div>
      <div class="total__info-date">
        <strong>Доступна с</strong> 12.06.2019 12:00
      </div>
    </div>
    <div>
      <img
        v-show="isLoaded"
        :src="selectedCar.thumbnail.path"
        class="total__img"
        @load="isLoaded = true"
      />
      <img
        v-show="!isLoaded"
        class="total__img"
        src="http://dummyimage.com/265x116/c0c0c0/ffffff0&text=car+image"
      />
    </div>
  </div>
</template>

<script>
import { getterTypes as orderGT } from "@/store/order";
import { mapGetters } from "vuex";

export default {
  name: "OrderTotal",
  props: {
    id: {
      type: Number
    }
  },
  data() {
    return {
      isLoaded: false
    };
  },
  computed: {
    ...mapGetters({
      selectedCar: orderGT.car
    }),
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
  flex-wrap: wrap;
}

.total__info {
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

.total__img {
  max-width: 256px;
  width: 100%;
}

@media (max-width: 1200px) {
  .total {
    padding: 32px 64px;
  }
}

@media (max-width: 600px) {
  .total {
    padding: 32px 32px;
  }
}
</style>
