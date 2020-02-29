import Vue from "vue";
import VueRouter from "vue-router";

import RolesOverview from "../views/RolesOverview.vue";
import RoleViewDialog from "../components/roles/RoleViewDialog.vue";
import TasksOverview from "../views/TaskOverview.vue";
// import UserProfile from "../views/UserProfile.vue";
// import UserSettings from "../views/UserSettings.vue";
// import GroupsOverview from "../views/GroupsOverview.vue";
// import GroupRouter from "../views/GroupRouter.vue";
// import GroupTasks from "../views/GroupTasks.vue";
// import GroupRoles from "../views/GroupRoles.vue";

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
    path: "/tasks",
    name: "tasksOverview",
    component: TasksOverview,
  },
  // {
  //   path: "/user/:username",
  //   name: "profile",
  //   component: UserProfile,
  // },
  // {
  //   path: "/settings",
  //   name: "settings",
  //   component: UserSettings
  // },
  // {
  //   path: "/groups",
  //   name: "groups",
  //   component: GroupsOverview
  // },
  // include new routes here
  // {
  //   // always keep this the last route as it dynamically matches any string
  //   // include new routes above
  //   /*
  //   subgroup1: national group or group in international group
  //   subgroup2: local group or group in national group
  //   subgroup3: group in local group
  //   */
  //   path: "/:subgroup1",
  //   component: GroupRouter,
  //   alias: [
  //     '/:subgroup1/:subgroup2',
  //     "/:subgroup1/:subgroup2/:subgroup3"
  //   ],
  //   children: [
  //     // Task page temporarily unavailable
  //     // {
  //     //   path: "tasks",
  //     //   name: "tasks",
  //     //   alias: "",
  //     //   component: GroupTasks,
  //     // },
  //     {
  //       path: "roles",
  //       name: "roles",
  //       component: GroupRoles
  //     }
  //   ]
  // },
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
