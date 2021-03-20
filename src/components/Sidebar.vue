<template>
  <div class="main__sidebar">
    <AppBurger
      @click="burgerClickHandler"
      color="#FFFFFF"
      :is-active="menuIsOpen"
      :style="{ 'z-index': menuIsOpen ? 104 : null }"
      :width="windowWidth < 768 ? 35 : undefined"
    />
    <AppLangSwitcher />
  </div>
</template>

<script>
import AppLangSwitcher from "@/components/LangSwitcher";
import AppBurger from "@/components/Burger";
import { mutationTypes, getterTypes } from "@/store/app";
import { mapGetters } from "vuex";

export default {
  name: "Sidebar",
  components: {
    AppLangSwitcher,
    AppBurger
  },
  computed: {
    ...mapGetters({
      menuIsOpen: getterTypes.menuIsOpen,
      windowWidth: getterTypes.windowWidth
    })
  },
  methods: {
    burgerClickHandler() {
      this.$store.commit(mutationTypes.toggleMenuVisibility);
    }
  }
};
</script>

<style scoped lang="scss">
.main__sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 64px;
  width: 100%;
  padding: 32px 8px 16px;
  background-color: #151b1f;
}

@media (max-width: 768px) {
  .main__sidebar {
    max-width: 86px;
  }
}

@media (max-width: 600px) {
  .main__sidebar {
    display: none;
  }
}
</style>
