<template>
  <div class="icon__wrapper">
    <simple-svg :src="require('@/assets/icons/' + this.name)" />
  </div>
</template>

<script>
export default {
  name: "base-icon",
  props: {
    name: {
      type: String,
      required: true
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
