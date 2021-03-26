<template>
  <ul class="crumbs__list">
    <router-link
      v-for="(item, index) of items"
      :key="index"
      :to="{ name: item.routeName }"
      v-slot="{ navigate, isExactActive }"
      custom
    >
      <li
        class="crumbs__item"
        :class="{
          'crumbs__item--active': isExactActive,
          'crumbs__item--disabled': !item.isAllowed
        }"
        @click="navigate"
      >
        {{ item.text }}
      </li>
    </router-link>
  </ul>
</template>

<script>
import { getterTypes } from "@/store/order";
import { mapGetters } from "vuex";

export default {
  name: "TheCrumbs",
  computed: {
    ...mapGetters({
      isLocationFilled: getterTypes.isLocationFilled
    }),
    items() {
      return [
        {
          text: "Местоположение",
          routeName: "orderLocation",
          isAllowed: true
        },
        {
          text: "Модель",
          routeName: "orderModel",
          isAllowed: this.isLocationFilled
        },
        {
          text: "Дополнительно",
          routeName: "orderAdditionally",
          isAllowed: false
        },
        {
          text: "Итого",
          routeName: "orderTotal",
          isAllowed: false
        }
      ];
    },
    routeName() {
      return this.$route.name;
    }
  }
};
</script>

<style scoped lang="scss">
.crumbs__item {
  position: relative;
  display: inline-block;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  transition: all 0.3s;
  color: $black;

  &--active {
    color: $accent;
  }

  &--disabled {
    color: $dark-grey;
    pointer-events: none;
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
</style>
