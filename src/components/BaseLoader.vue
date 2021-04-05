<template>
  <div class="loader">
    <base-icon name="loader" class="loader__icon" />
  </div>
</template>

<script>
export default {
  name: "BaseLoader"
};
</script>

<style scoped lang="scss">
.loader__icon {
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
