<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mutationTypes } from "@/store/app";

export default {
  name: "App",
  methods: {
    setViewHeightVariable() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
    setWindowWidth() {
      let width = window.innerWidth;
      this.$store.commit(mutationTypes.setWindowWidth, width);
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
