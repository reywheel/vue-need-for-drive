<template>
  <div class="icon__wrapper">
    <simple-svg :src="require(`@/assets/icons/${name}.${type}`)" />
  </div>
</template>

<script>
export default {
  name: "BaseIcon",
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "svg"
    }
  }
};
</script>

<style scoped lang="scss">
.icon__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
