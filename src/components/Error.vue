<template>
  <div class="error__wrapper">
    <div class="error">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error"
};
</script>

<style scoped lang="scss">
.error__wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.error {
  display: inline-block;
  padding: 10px;
  border-radius: 10px;
  background-color: #f57e7e;
  border: 1px solid #fa2020;
}
</style>
