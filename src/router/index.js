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
    path: "/:country_code",
    component: CircleRouter,
    alias: [
      '/:country_code/:circle',
      '/:country_code/:local_group/:circle'
    ],
    children: [
      {
        path: "",
        name: "tasks",
        component: CircleTasks
      },
      {
        path: "roles",
        name: "roles",
        component: CircleRoles
      }
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
