// We need this import for testing
import "unfetch/polyfill";
import Vue from "vue";
import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import user from "@/store/modules/user";

Vue.use(VueApollo);

const baseUrl = process.env.VUE_APP_HASURA_SERVER_URL;

const httpLink = createHttpLink({
  uri: `${baseUrl}/v1/graphql`
});

// set request headers based on current application state
const dynamicLink = setContext((_, { headers }) => {
  const loginToken = user.state.token;
  return {
    headers: {
      ...headers,
      // If the loginToken exists, this property will be added
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
      errorPolicy: "all",
      fetchPolicy: "no-cache"
    }
  }
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

export { apolloClient, apolloProvider };
