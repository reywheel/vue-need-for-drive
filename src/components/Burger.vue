<template>
  <div
    @click="clickHandler"
    :class="{ burger: true, 'burger--active': isActive }"
  >
    <span class="burger__line"></span>
    <span class="burger__line"></span>
    <span class="burger__line"></span>
    <svg
      class="burger__cross"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 2L2 18"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2 2L18 18"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "Burger",
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickHandler() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped>
.burger {
  position: relative;
  cursor: pointer;
  width: 27px;

  &:focus {
    outline: none;
  }

  &--active {
    .burger__line {
      opacity: 0;
      pointer-events: none;
    }

    .burger__cross {
      opacity: 1;
      pointer-events: initial;
      cursor: pointer;
    }
  }
}

.burger__line {
  display: block;
  width: 100%;
  height: 3px;

  border-radius: 1px;

  &:not(:first-child) {
    margin-top: 5px;
  }
}

.burger__cross {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s;
}
</style>

<style lang="scss">
.burger__line {
  background-color: $white;
}
</style>
