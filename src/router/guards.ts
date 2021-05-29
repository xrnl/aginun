import gql from "graphql-tag";
import { apolloClient } from "@/plugins/vue-apollo";
import store from "../store";

async function healthCheck() {
  const { errors } = await apolloClient.query({
    query: gql`
      query HealthCheckQuery {
        config {
          alive
        }
      }
    `
  });

  store.dispatch("errors/serverError", !!errors);
}

export async function rolesGuard(to, from, next) {
  // We need this to only run the healthcheck once
  if (store.state.errors.serverError === undefined) {
    await healthCheck();
  }

  if (store.state.errors.serverError) {
    next("/error");
    return;
  }

  if (to.query) {
    new URLSearchParams(to.query).forEach((filterValue, filterType) => {
      if (filterValue.length > 0) {
        store.commit("roles/setFilter", {
          filterType,
          filterValue:
            filterType === "search"
              ? filterValue
              : filterValue.split(",").map((el) => parseInt(el, 10))
        });
      }
    });
  }

  next();
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
