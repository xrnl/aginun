import Vue from "vue";
import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

// Install the vue plugin
Vue.use(VueApollo);

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "https://xr-volunteer-app.herokuapp.com/v1/graphql",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

// eslint-disable-next-line no-unused-vars
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
