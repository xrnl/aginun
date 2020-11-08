import store from "../store";

export function rolesErrorGuard(to, from, next) {
  if (store.state.roles.serverError) {
    next("/error");
  } else {
    next();
  }
}

export function hasErrorsGuard(to, from, next) {
  if (!store.state.roles.serverError) {
    next("/");
  } else {
    next();
  }
}
