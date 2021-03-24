<template>
  <div id="app">
    <component :is="layoutName" />
  </div>
</template>

<script>
import { mutationTypes } from "@/store/app";
import { mapMutations } from "vuex";
import DefaultLayout from "@/layouts/DefaultLayout";

export default {
  name: "App",
  components: {
    DefaultLayout
  },
  methods: {
    ...mapMutations([mutationTypes.setWindowWidth]),
    setViewHeightVariable() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
    setWindowWidth() {
      let width = window.innerWidth;
      this[mutationTypes.setWindowWidth](width);
    }
  },
  computed: {
    // Построение имени компонента лэйаута по данным из мета поля роута
    layoutName() {
      const layoutName = this.$route.meta.layout || "default";
      return layoutName[0].toUpperCase() + layoutName.slice(1) + "Layout";
    }
  },
  mounted() {
    this.setViewHeightVariable();
    this.setWindowWidth();

    window.addEventListener("resize", () => {
      this.setViewHeightVariable();
      this.setWindowWidth();
    });
  }
};
</script>

<style lang="scss">
@import "~normalize.css/normalize.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap");

*,
*:before,
*:after {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

html {
  font-family: $roboto;
}

h1,
h2,
h3,
h4,
h5,
p {
  margin: 0;
  padding: 0;
}

ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}

#app {
  height: calc(var(--vh, 1vh) * 100);
}
</style>
