const isDevelopment = process.env.NODE_ENV === "development";

if (isDevelopment) {
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
    devServer: {
      proxy: process.env.VUE_APP_API_URL
    }
  };
} else {
  module.exports = {
    publicPath: "/vue-need-for-drive/",
    css: {
      loaderOptions: {
        sass: {
          prependData: `@import "@/scss/variables.scss";`
        }
      }
    }
  };
}
