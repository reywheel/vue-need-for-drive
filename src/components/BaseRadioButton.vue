<template>
  <div class="radio">
    <input
      type="radio"
      class="radio__input"
      :id="nativeValue"
      :name="name"
      :value="nativeValue"
      @change="$emit('input', nativeValue)"
    />
    <label
      :for="nativeValue"
      class="radio__label"
      :class="{ 'radio__label--active': value === nativeValue }"
    >
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: "BaseRadioButton",
  props: {
    value: {
      required: true
    },
    name: {
      type: String,
      required: true
    },
    nativeValue: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped lang="scss">
.radio__input {
  display: none;
}

.radio__label {
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

  &--active {
    &::before {
      border: 3px solid $accent;
    }
  }
}
</style>
