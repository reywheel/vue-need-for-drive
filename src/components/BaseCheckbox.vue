<template>
  <div class="checkbox">
    <input
      :id="id"
      :checked="value"
      type="checkbox"
      class="checkbox__input"
      @change="$emit('input', !value)"
    />
    <label
      :for="id"
      class="checkbox__label"
      :class="{ 'checkbox__label--active': value }"
      >{{ label }}</label
    >
  </div>
</template>

<script>
export default {
  name: "BaseCheckbox",
  props: {
    value: {
      required: true
    },
    id: {
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

<style lang="scss" scoped>
.checkbox__input {
  display: none;
}

.checkbox__label {
  position: relative;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: $dark-grey;
  padding-left: 20px;

  &::before,
  &::after {
    content: "";
    position: absolute;
  }

  &::before {
    width: 12px;
    height: 12px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border: 1px solid $dark-grey;
  }

  &::after {
    display: none;
    left: 2px;
    top: 3px;
    width: 13px;
    height: 10px;
    background: url(~@/assets/icons/check-mark.svg) center no-repeat;
    background-size: contain;
  }

  &--active {
    color: $black;

    &::before {
      border-color: $accent;
    }

    &::after {
      display: block;
    }
  }
}
</style>
