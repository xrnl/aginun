module.exports = {
  client: {
    service: {
      name: 'aginun2',
      // URL to the GraphQL API
      url: 'https://xr-volunteer-app.herokuapp.com/v1/graphql',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
}