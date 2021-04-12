<template>
  <div class="radio">
    <input
      type="radio"
      class="radio__input"
      v-bind="$attrs"
      :value="value"
      :id="id"
      @change="$emit('input', value)"
    />
    <label
      :for="id"
      class="radio__label"
      :class="{ 'radio__label--active': vModelValue === value }"
    >
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: "BaseRadioButton",
  inheritAttrs: false,
  model: {
    prop: "vModelValue"
  },
  props: {
    value: {
      required: true,
      type: String
    },
    vModelValue: {
      required: true
    },
    label: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      id: Math.random()
    };
  }
};
</script>

<style scoped lang="scss">
.radio__input {
  display: none;
}

.radio__label {
  position: relative;
  display: block;
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

  &--active {
    &::before {
      border: 3px solid $accent;
    }
  }
}
</style>
