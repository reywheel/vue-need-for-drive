<template>
  <div class="selector" @click="toggleLang">{{ lang }}</div>
</template>

<script>
import { getterTypes, mutationTypes } from "@/store/app";

export default {
  name: "LangSelector",
  computed: {
    lang: {
      get() {
        return this.$store.getters[getterTypes.lang];
      },
      set(newLang) {
        this.$store.commit(mutationTypes.setLang, newLang);
      }
    }
  },
  methods: {
    toggleLang() {
      if (this.lang === "Eng") this.lang = "Рус";
      else this.lang = "Eng";
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
