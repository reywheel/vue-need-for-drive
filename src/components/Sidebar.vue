<template>
  <div class="sidebar">
    <app-burger
      @click="burgerClickHandler"
      class="sidebar__burger"
      :class="{ 'sidebar__burger--active': menuIsOpen }"
      :is-active="menuIsOpen"
    />
    <app-lang-switcher />
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
.sidebar {
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

.sidebar__burger {
  &--active {
    z-index: 104;
  }
}

@media (max-width: 768px) {
  .sidebar {
    max-width: 86px;
  }

  .sidebar__burger {
    width: 35px;
  }
}

@media (max-width: 600px) {
  .sidebar {
    display: none;
  }
}
</style>
