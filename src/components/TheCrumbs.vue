<template>
  <ul class="crumbs__list">
    <router-link
      v-for="(item, index) of items"
      :key="index"
      :to="{ name: item.routeName }"
      v-slot="{ navigate, isExactActive }"
    >
      <li
        class="crumbs__item"
        :class="{ 'crumbs__item--active': isExactActive }"
        @click="navigate"
      >
        {{ item.text }}
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "TheCrumbs",
  data() {
    return {
      items: [
        {
          text: "Местоположение",
          routeName: "orderLocation"
        },
        {
          text: "Модель",
          routeName: "orderModel"
        },
        {
          text: "Дополнительно",
          routeName: "orderAdditionally"
        },
        {
          text: "Итого",
          routeName: "orderTotal"
        }
      ]
    };
  },
  computed: {
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
</style>
