<template>
  <a :href="href" class="link" :class="{ 'link--disabled': disabled }">
    <slot />
  </a>
</template>

<script>
export default {
  name: "base-link",
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
  --color: #{$black};
  --color-hover: #{$accent};
  --color-active: #{$accent};

  text-decoration: none;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  transition: color 0.3s;
  color: var(--color);

  &:hover {
    color: var(--color-hover);
  }

  &:active {
    color: var(--color-active);
  }

  &--disabled {
    color: $dark-grey;
    pointer-events: none;

    &:hover {
      color: $dark-grey;
    }
  }
}
</style>
