<template>
  <button
    class="button"
    :class="{ 'button--disabled': disabled }"
    :disabled="disabled"
    @click.prevent="clickHandler"
  >
    <span class="button__text" :class="{ 'button__text--hide': loading }">{{
      text
    }}</span>
    <i
      class="button__loader-wrapper"
      :class="{ 'button__loader-wrapper--hide': !loading }"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="button__loader"
      >
        <path
          d="M26 14C26 7.37258 20.6274 2 14 2C7.37258 2 2 7.37258 2 14C2 20.6274 7.37258 26 14 26"
          stroke="#F5F6F8"
          stroke-width="3"
        />
      </svg>
    </i>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
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

<style scoped lang="scss">
.button {
  position: relative;
  padding: 15px 49px 11px;
  background: linear-gradient(90deg, #0ec261 2.61%, #039f67 112.6%);
  background-blend-mode: darken;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:not(.button--disabled):hover {
    background: linear-gradient(90deg, #0b934a 2.61%, #026e47 112.6%);
  }

  &:not(.button--disabled):focus {
    background: linear-gradient(90deg, #0b934a 2.61%, #026e47 112.6%);
    outline: none;
  }

  &:not(.button--disabled):active {
    background: linear-gradient(90deg, #076432 2.61%, #013c27 112.6%);
  }

  &--disabled {
    background: #eeeeee;
    cursor: default;
  }
}

.button__text {
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #ffffff;

  &--hide {
    opacity: 0;
    pointer-events: none;
  }
}

.button__loader-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  &--hide {
    display: none;
  }
}

.button__loader {
  animation: loader;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes loader {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
