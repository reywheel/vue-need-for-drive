<template>
  <div class="selector" @click="clickHandler">{{ text }}</div>
</template>

<script>
export default {
  name: "LangSelector",
  props: {
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    clickHandler() {
      this.$emit("click");
    }
  }
};
</script>

<style scoped lang="scss">
.selector {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 100%;
  color: $accent;
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;

  &:hover {
    border: 1px solid #eeeeee;
    color: #eeeeee;
  }

  &:active {
    color: $accent;
  }
}
</style>
