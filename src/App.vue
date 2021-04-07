<template>
  <div id="app">
    <app-error v-for="(error, index) of errors" :key="index">
      {{ error }}
    </app-error>
    <component :is="layoutName" />
  </div>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout";
import { actionTypes as cityListAT } from "@/store/cityList";
import { getterTypes as errorsGT } from "@/store/errors";
import { mapGetters } from "vuex";
import AppError from "@/components/Error";

export default {
  name: "App",
  components: {
    DefaultLayout,
    AppError
  },
  methods: {
    setViewHeightVariable() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  },
  computed: {
    ...mapGetters({
      errors: errorsGT.errors
    }),
    // Построение имени компонента лэйаута по данным из мета поля роута
    layoutName() {
      const layoutName = this.$route.meta.layout || "default";
      return layoutName[0].toUpperCase() + layoutName.slice(1) + "Layout";
    }
  },
  created() {
    this.$store.dispatch(cityListAT.getCityList);
  },
  mounted() {
    this.setViewHeightVariable();

    window.addEventListener("resize", () => {
      this.setViewHeightVariable();
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
  min-height: calc(var(--vh, 1vh) * 100);
}

.loading {
  position: relative;
  pointer-events: none;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    animation-duration: 1.8s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #fafafa 8%, #cdcdcd 38%, #fafafa 54%);
    background-size: 1000px 640px;
    opacity: 0.5;
    z-index: 10;
  }
}

@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
</style>
