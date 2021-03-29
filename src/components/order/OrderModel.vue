<template>
  <div class="model">
    <div class="model__header">
      <base-radio-button
        v-model="filter"
        name="filter"
        native-value="all"
        label="Все модели"
        class="model__radio-wrapper"
      />
      <base-radio-button
        v-model="filter"
        name="filter"
        native-value="economy"
        label="Эконом"
        class="model__radio-wrapper"
      />
      <base-radio-button
        v-model="filter"
        name="filter"
        native-value="premium"
        label="Премиум"
        class="model__radio-wrapper"
      />
    </div>
    <div class="model__list">
      <div class="model__list-inner">
        <div
          v-for="(car, index) of carList"
          :key="index"
          class="model__list-item item"
          :class="{ 'item--active': selectedCarId === car.id }"
          @click="selectedCarId = car.id"
        >
          <div class="item__title">{{ car.title }}</div>
          <div class="item__price">{{ car.price }}</div>
          <img :src="car.img" class="item__image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getterTypes as carListGetterTypes } from "@/store/carList";
import {
  getterTypes as orderGetterTypes,
  mutationTypes as orderMutationTypes
} from "@/store/order";
import { mapGetters } from "vuex";

export default {
  name: "StepTwo",
  data() {
    return {
      filter: "all"
    };
  },
  computed: {
    ...mapGetters({
      carList: carListGetterTypes.carList
    }),
    selectedCarId: {
      get() {
        return this.$store.getters[orderGetterTypes.carId];
      },
      set(newCarId) {
        this.$store.commit(orderMutationTypes.setCarId, newCarId);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.model {
  padding: 32px 64px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.model__header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 48px;
}

.model__radio-wrapper {
  &:not(:last-child) {
    margin-right: 16px;
  }
}

.model__radio {
  display: none;
}

.model__radio-label {
  position: relative;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: $black;
  padding-left: 20px;
  cursor: pointer;

  &::before {
    content: "";
    width: 12px;
    height: 12px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border: 1px solid $dark-grey;
    border-radius: 100%;
  }
}

.model__radio:checked ~ .model__radio-label {
  &::before {
    border: 3px solid $accent;
  }
}

.model__list {
  flex-grow: 1;
  position: relative;
}

.model__list-inner {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    border: 1px solid $light-grey;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $dark-grey;
    border: 2px solid transparent;
    border-radius: 4px;
    background-clip: content-box;
  }
}

.item {
  border: 1px solid $light-grey;
  padding: 16px;
  max-width: 368px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    border-color: $dark-grey;
  }

  &--active {
    border-color: $accent;

    &:hover {
      border-color: $accent;
    }
  }
}

.item__title {
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: $black;
}

.item__price {
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: $dark-grey;
  margin-bottom: 36px;
}

.item__image {
  align-self: flex-end;
}
</style>
