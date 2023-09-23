import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Signin from "../views/Signin.vue";
import Singup from "../views/Singup.vue";
import EmailCode from "../views/EmailCode.vue";
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/signin",
    component: Signin,
  },
  {
    path: "/signup",
    component: Singup,
  },
  {
    path: "/email-code",
    component: EmailCode,
  },
  // Add more routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
