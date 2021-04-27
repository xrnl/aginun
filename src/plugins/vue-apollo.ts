// We need this import for testing
import "unfetch/polyfill";
import Vue from "vue";
import VueApollo from "vue-apollo";
import i18n from "@/i18n/i18n";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

Vue.use(VueApollo);

const httpLink = createHttpLink({
  uri: "http://178.62.229.109/v1/graphql",
  headers: {
    // "x-hasura-admin-secret": process.env.VUE_APP_API_KEY
  }
});

// set request headers based on current application state
const dyanmicLink = setContext((_, { headers }) => {
  const loginToken = Vue.$cookies.get('loginToken');
  return {
    headers: {
      ...headers,
      "x-hasura-lang": i18n.locale,
      // If the loginToken exists, this property will bed added
      ...(loginToken && {authorization: `Bearer ${loginToken}`})
    }
  };
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: dyanmicLink.concat(httpLink),
  cache,
  defaultOptions: {
    query: {
      errorPolicy: "all"
    }
  }
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

export { apolloClient, apolloProvider };
