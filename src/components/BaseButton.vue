<template>
  <button
    class="button"
    :class="{ 'button--disabled': disabled }"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span class="button__text" :class="{ 'button__text--hide': loading }">
      <slot />
    </span>
    <i
      class="button__loader-wrapper"
      :class="{ 'button__loader-wrapper--hide': !loading }"
    >
      <base-icon name="loader" class="button__loader" />
    </i>
  </button>
</template>

<script>
import chroma from "chroma-js";

export default {
  name: "BaseButton",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    gradient: {
      type: Object,
      default: function() {
        return {
          from: "#0ec261",
          to: "#039f67"
        };
      }
    }
  },
  methods: {
    setGradientVariables() {
      this.$el.style.setProperty("--gradient-from", `${this.gradient.from}`);
      this.$el.style.setProperty("--gradient-to", `${this.gradient.to}`);
      this.$el.style.setProperty(
        "--gradient-from-darken-10",
        `${chroma(this.gradient.from).darken()}`
      );
      this.$el.style.setProperty(
        "--gradient-to-darken-10",
        `${chroma(this.gradient.to).darken()}`
      );
      this.$el.style.setProperty(
        "--gradient-from-darken-20",
        `${chroma(this.gradient.from).darken(2)}`
      );
      this.$el.style.setProperty(
        "--gradient-to-darken-20",
        `${chroma(this.gradient.to).darken(2)}`
      );
    }
  },
  mounted() {
    this.setGradientVariables();
  }
};
</script>

<style scoped lang="scss">
.button {
  --border-radius: 8px;

  position: relative;
  padding: 15px 49px 13px;
  border-radius: var(--border-radius);
  background: linear-gradient(
    90deg,
    var(--gradient-from) 2.61%,
    var(--gradient-to) 112.6%
  );
  background-blend-mode: darken;
  border: none;
  cursor: pointer;

  &:not(.button--disabled):hover {
    background: linear-gradient(
      90deg,
      var(--gradient-from-darken-10) 2.61%,
      var(--gradient-to-darken-10) 112.6%
    );
  }

  &:not(.button--disabled):focus {
    background: linear-gradient(
      90deg,
      var(--gradient-from-darken-10) 2.61%,
      var(--gradient-to-darken-10) 112.6%
    );
    outline: none;
  }

  &:not(.button--disabled):active {
    background: linear-gradient(
      90deg,
      var(--gradient-from-darken-20) 2.61%,
      var(--gradient-to-darken-20) 112.6%
    );
  }

  &--disabled {
    background: $light-grey;
    cursor: default;
  }
}

.button__text {
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: $white;

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
