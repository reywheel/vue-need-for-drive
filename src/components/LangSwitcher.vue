<template>
  <div class="selector" @click="toggleLang">{{ lang }}</div>
</template>

<script>
export default {
  name: "LangSelector",
  computed: {
    lang() {
      return this.$i18n.locale === "ru" ? "Рус" : "Eng";
    }
  },
  methods: {
    toggleLang() {
      this.$i18n.locale === "ru"
        ? (this.$i18n.locale = "eng")
        : (this.$i18n.locale = "ru");
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
