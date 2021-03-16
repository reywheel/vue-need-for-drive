<template>
  <div>
    <div class="header">main</div>
    <AppButton
      text="Зарегистрироваться"
      :loading="isLoading"
      @click="toggleIsLoading"
      :disabled="false"
    />
  </div>
</template>

<script>
import AppButton from "@/components/Button";

export default {
  name: "Main",
  components: {
    AppButton
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    toggleIsLoading() {
      this.isLoading = !this.isLoading;
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  font-size: 20px;
  margin-bottom: 20px;
}
</style>
