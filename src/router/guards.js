import store from "../store";
import gql from "graphql-tag";
import { apolloClient } from "@/plugins/vue-apollo";

export async function rolesErrorGuard(to, from, next) {
  // We need this to only run the healthcheck once
  if (store.state.errors.serverError === undefined) {
    await healthCheck();
  }

  if (store.state.errors.serverError) {
    next("/error");
  } else {
    next();
  }
}

export async function hasErrorsGuard(to, from, next) {
  // We need this to only run the healthcheck once
  if (store.state.errors.serverError === undefined) {
    await healthCheck();
  }

  if (store.state.errors.serverError === false) {
    next("/");
  } else {
    next();
  }
}

async function healthCheck() {
  const { errors } = await apolloClient.query({
    query: gql`
      {
        config {
          alive
        }
      }
    `,
  });

  if (errors) {
    store.dispatch("errors/serverError", true);
  } else {
    store.dispatch("errors/serverError", false);
  }
}
