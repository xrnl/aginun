import Vue from "vue";
import VueRouter from "vue-router";

import UserProfile from "../views/UserProfile.vue";
import UserSettings from "../views/UserSettings.vue";
import Explore from "../views/Explore.vue";
import CirclesOverview from "../views/CirclesOverview.vue";
import CircleRouter from "../views/CircleRouter.vue";
import CircleTasks from "../views/CircleTasks.vue";
import CircleRoles from "../views/CircleRoles.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "profile",
    component: UserProfile,
    alias: "/user/:username"
  },
  {
    path: "/settings",
    name: "settings",
    component: UserSettings
  },
  {
    path: "/explore",
    name: "explore",
    component: Explore
  },
  {
    path: "/circles",
    name: "circles",
    component: CirclesOverview
  },
  // include new routes here
  {
    // always keep this the last route as it dynamically matches any string
    // include new routes above
    /*
    subcircle1: national group or circle in international group
    subcircle2: local group or circle in national group
    subcircle3: circle in local group
    */
    path: "/:subcircle1",
    component: CircleRouter,
    alias: [
      '/:subcircle1/:subcircle2',
      "/:subcircle1/:subcircle2/:subcircle3"
    ],
    children: [
      {
        path: "tasks",
        name: "tasks",
        alias: "",
        component: CircleTasks,
      },
      {
        path: "roles",
        name: "roles",
        component: CircleRoles
      }
    ]
  },
  {
    // non-existent pages redirect to the home page
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
