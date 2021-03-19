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
  },
  publicPath:
    process.env.NODE_ENV === "production" ? "/vue-need-for-drive/" : "/"
};
