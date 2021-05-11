// We need this import for testing
import "unfetch/polyfill";
import Vue from "vue";
import VueApollo from "vue-apollo";
import i18n from "@/i18n/i18n";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import user from "@/store/modules/user";

Vue.use(VueApollo);

const httpLink = createHttpLink({
  uri: "http://178.62.229.109/v1/graphql"
});

// set request headers based on current application state
const dynamicLink = setContext((_, { headers }) => {
  const loginToken = user.state.token;
  return {
    headers: {
      ...headers,
      "x-hasura-lang": i18n.locale,
      // If the loginToken exists, this property will bed added
      ...(loginToken && { authorization: `Bearer ${loginToken}` })
    }
  };
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: dynamicLink.concat(httpLink),
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
