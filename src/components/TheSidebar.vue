<template>
  <div class="sidebar">
    <base-burger
      class="sidebar__burger"
      :class="{ 'sidebar__burger--active': menuIsOpen }"
      :is-active="menuIsOpen"
      @click="burgerClickHandler"
    />
    <app-lang-switcher />
  </div>
</template>

<script>
import AppLangSwitcher from "@/components/LangSwitcher";
import { mutationTypes, getterTypes } from "@/store/app";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Sidebar",
  components: {
    AppLangSwitcher
  },
  computed: {
    ...mapGetters({
      menuIsOpen: getterTypes.menuIsOpen,
      windowWidth: getterTypes.windowWidth
    })
  },
  methods: {
    ...mapMutations({
      toggleMenuVisibility: mutationTypes.toggleMenuVisibility
    }),
    burgerClickHandler() {
      this.toggleMenuVisibility();
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
  min-height: 100%;
  max-width: 64px;
  width: 100%;
  padding: 32px 8px 16px;
  background-color: $black-2;
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
