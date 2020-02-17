module.exports = {
  client: {
    service: {
      name: "aginun-server",
      url: "https://xr-volunteer-app.herokuapp.com/v1/graphql",
    },
    // Files processed by the extension
    includes: ["src/**/*.gql"],
  },
};
