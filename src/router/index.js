import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import loginView from "../views/loginPage.vue";
import homeworkView from "../views/homeworkPage.vue";
import registerView from "../views/registerView.vue";
import doHomework from "../components/employHomework.vue";
import detailHomework from "../components/detailHomework.vue";
import adminView from "../views/adminView.vue";
import detailForadmin from "../views/detailForadmin.vue";
import profilePage from "../views/profilePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "profile",
      component: profilePage,
    },
    {
      path: "/detailForadmin",
      name: "detailForadmin",
      component: detailForadmin,
    },
    {
      path: "/login",
      name: "login",
      component: loginView,
    },
    {
      path: "/admin",
      name: "admin",
      component: adminView,
    },
    {
      path: "/homework",
      name: "homework",
      component: homeworkView,
      children: [
        {
          path: "/detail",
          name: "detail",
          component: detailHomework,
        },
        {
          path: "/do",
          name: "do",
          component: doHomework,
        },
      ],
    },

    {
      path: "/register",
      name: "register",
      component: registerView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
