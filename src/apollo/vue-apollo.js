import Vue from "vue";
import VueApollo from "vue-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import {
  createApolloClient,
  restartWebsockets,
} from "vue-cli-plugin-apollo/graphql-client";
import * as typeDefs from "@/gql/typedefs.gql";
import { resolvers } from "./resolvers";

// Install the vue plugin
Vue.use(VueApollo);

// Name of the localStorage item
const AUTH_TOKEN = "apollo-token";

// Http endpoint
const httpEndpoint =
  process.env.VUE_APP_GRAPHQL_HTTP ||
  "https://xr-volunteer-app.herokuapp.com/v1/graphql";

const cache = new InMemoryCache();
cache.writeData({
  data: {
    selectedLocalGroups: [],
    selectedWorkingGroups: [],
    selectedTimeCommitment: [],
    roleAmount: 0,
    searchString: "",
    limit: 20,
    navbarHeight: "64px",
  },
});

const httpLink = createHttpLink({
  uri: "https://xr-volunteer-app.herokuapp.com/v1/graphql",
});

// Config
const defaultOptions = {
  ssr: false,
  cache,
  typeDefs,
  resolvers,
};

// Call this in the Vue app file
export function createProvider(options = {}) {
  // Create apollo client
  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options,
  });
  apolloClient.wsClient = wsClient;

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      httpLink,
      $query: {
        fetchPolicy: "cache-first",
      },
    },
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.log(
        "%cError",
        "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
        error.message
      );
    },
    // watchLoading (isLoading, countModifier) {
    //   // loading += countModifier
    //   console.log('Global loading', isLoading, countModifier)
    // },
  });

  return apolloProvider;
}

// Manually call this when user log in
export async function onLogin(apolloClient, token) {
  if (typeof localStorage !== "undefined" && token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("%cError on cache reset (login)", "color: orange;", e.message);
  }
}

// Manually call this when user log out
export async function onLogout(apolloClient) {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("%cError on cache reset (logout)", "color: orange;", e.message);
  }
}
