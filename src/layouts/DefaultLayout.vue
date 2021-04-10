<template>
  <div class="layout">
    <app-sidebar />
    <router-view />
    <app-menu />
  </div>
</template>

<script>
import AppSidebar from "@/components/TheSidebar";
import AppMenu from "@/components/TheMenu";

export default {
  name: "DefaultLayout",
  components: {
    AppSidebar,
    AppMenu
  }
};
</script>

<style>
.layout {
  display: flex;
  min-height: calc(var(--vh, 1vh) * 100);
}
</style>
