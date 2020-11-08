import Vue from "vue";
import VueRouter from "vue-router";

import RolesOverview from "../views/RolesOverview.vue";
import RoleViewDialog from "../components/roles/RoleViewDialog.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/roles",
    name: "roles",
    component: RolesOverview,
    alias: "/",
    children: [{ path: "view/:id", component: RoleViewDialog }],
  },
  {
    // non-existent pages redirect to the home page
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
