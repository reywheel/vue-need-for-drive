module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/scss/variables.scss";`
      }
    }
  }
};
