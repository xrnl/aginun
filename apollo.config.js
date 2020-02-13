const config = {
  client: {
    service: {
      name: "aginun2",
      // URL to the GraphQL API
      url: "https://xr-volunteer-app.herokuapp.com/v1/graphql"
      // url: "http://localhost:8080/v1/graphql"
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"]
  }
};

export { config };
