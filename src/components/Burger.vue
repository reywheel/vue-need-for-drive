<template>
  <div
    @click="clickHandler"
    :class="{ burger: true, 'burger--active': isActive }"
  >
    <span class="burger__line"></span>
    <span class="burger__line"></span>
    <span class="burger__line"></span>
    <app-icon name="cross.svg" class="burger__cross" />
  </div>
</template>

<script>
import AppIcon from "@/components/Icon";

export default {
  name: "Burger",
  components: {
    AppIcon
  },
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
