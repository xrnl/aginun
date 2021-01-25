const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave: process.env.NODE_ENV !== "production",
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/styles/global.scss")]
    },
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: path.resolve(__dirname, "./src/i18n/messages"),
      enableInSFC: true
    }
  },
  chainWebpack: (config) => {
    // GraphQL Loader
    config.module
      .rule("graphql")
      .test(/\.(graphql|gql)$/)
      .use("graphql-tag/loader")
      .loader("graphql-tag/loader")
      .end();

    // Don't prefetch translation files
    config.plugin("prefetch").tap((options) => {
      if (!options[0].fileBlacklist) {
        options[0].fileBlacklist = [];
      }

      options[0].fileBlacklist.push(/lang-.*/);

      return options;
    });
  }
};
