<template>
  <div class="item" :class="{ 'item--active': isActive }">
    <div class="item__title">{{ car.name }}</div>
    <div class="item__price">{{ car.priceMax }}</div>
    <div class="item__image-wrapper">
      <img :src="car.thumbnail.path" class="item__image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CarCard",
  props: {
    car: {
      type: Object,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  border: 1px solid $light-grey;
  padding: 16px;
  max-width: 368px;
  min-height: 224px;
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

.item__image-wrapper {
  max-width: 256px;
  align-self: flex-end;
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
}

.item__image {
  height: auto;
  max-width: 100%;
}
</style>
