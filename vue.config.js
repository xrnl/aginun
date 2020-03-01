const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/styles/global.scss")],
    },
    apollo: { lintGQL: true, enableMocks: true, enableEngine: false },
  },

  // chainWebpack: config => {
  //   config.module
  //     .rule("graphql")
  //     .test(/\.gql$/)
  //     .use("graphql-tag/loader")
  //     .loader("graphql-tag/loader")
  //     .end();
  // },
};
