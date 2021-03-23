<template>
  <a :href="href" class="link" :class="{ 'link--disabled': disabled }">
    <slot />
  </a>
</template>

<script>
export default {
  name: "Link",
  props: {
    href: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.link {
  text-decoration: none;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  transition: color 0.3s;
  color: #121212;

  &:hover {
    color: $accent;
  }

  &:active {
    color: $accent;
  }

  &--disabled {
    color: #999999;
    pointer-events: none;

    &:hover {
      color: #999999;
    }
  }
}
</style>
