<template>
  <div class="layout">
    <app-sidebar />
    <router-view />
  </div>
</template>

<script>
import AppSidebar from "@/components/Sidebar";

export default {
  name: "DefaultLayout",
  components: {
    AppSidebar
  }
};
</script>

<style>
.layout {
  display: flex;
  height: 100%;
}
</style>
