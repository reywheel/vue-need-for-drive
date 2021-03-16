<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~normalize.css/normalize.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap");

*,
*:before,
*:after {
  box-sizing: border-box;
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

#app {
  height: 100vh;
}
</style>
