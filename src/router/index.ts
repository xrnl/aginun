import Vue from "vue";
import VueRouter from "vue-router";

import { rolesErrorGuard, hasErrorsGuard } from "./guards";
import ErrorPage from "../views/ErrorPage.vue";
import RolesOverview from "../views/RolesOverview.vue";
import AboutPage from "../views/AboutPage.vue";
import SupportPage from "../views/SupportPage.vue";
import RoleViewDialog from "../components/roles/RoleViewDialog.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/roles",
    name: "roles",
    beforeEnter: rolesErrorGuard,
    component: RolesOverview,
    alias: "/",
    props: {
      isMyRolesMode: false
    },
    children: [{ path: "view/:id", component: RoleViewDialog }]
  },
  {
    path: "/my-roles",
    name: "myRoles",
    beforeEnter: rolesErrorGuard,
    component: RolesOverview,
    props: {
      isMyRolesMode: true
    },
    alias: "/my-roles",
    children: [{ path: "view/:id", component: RoleViewDialog }]
  },
  {
    path: "/error",
    name: "error",
    beforeEnter: hasErrorsGuard,
    component: ErrorPage
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage
  },
  {
    path: "/support",
    name: "support",
    component: SupportPage
  },
  {
    // non-existent pages redirect to the home page
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
