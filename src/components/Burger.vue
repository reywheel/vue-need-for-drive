<template>
  <div
    @click="clickHandler"
    :class="{ burger: true, 'burger--active': isActive }"
    :style="{ gap: gap + 'px', height: height + 'px', width: width + 'px' }"
  >
    <span
      v-for="n in lineCount"
      :key="n"
      :style="{ height: lineHeight + 'px', backgroundColor: color }"
    ></span>
    <svg
      class="cross"
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
    },
    lineCount: {
      type: Number,
      default: 3
    },
    height: {
      type: Number,
      default: 19
    },
    width: {
      type: Number,
      default: 27
    },
    lineHeight: {
      type: Number,
      default: 3
    },
    gap: {
      type: Number,
      default: 5
    },
    color: {
      type: String,
      default: "#000000"
    }
  },
  methods: {
    clickHandler() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss">
.burger {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  span {
    display: inline-block;
    border-radius: 2px;
    transition: all 0.3s;
  }

  .cross {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s;
  }

  &--active {
    span {
      opacity: 0;
      pointer-events: none;
    }

    .cross {
      opacity: 1;
      pointer-events: initial;
      cursor: pointer;
    }
  }
}
</style>
