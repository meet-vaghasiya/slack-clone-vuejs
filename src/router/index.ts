import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Signin from "@/views/Signin.vue";
import Singup from "@/views/Singup.vue";
import EmailCode from "@/views/EmailCode.vue";
import ProfileSetup from "@/views/ProfileSetup.vue";
import NotFound from "@/views/NotFound.vue";
import AcceptInvitation from "@/views/AcceptInvitation.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/signin",
    component: Signin,
    name: "Signin",
  },
  {
    path: "/signup",
    component: Singup,
    name: "Signup",
  },
  {
    path: "/email-code",
    component: EmailCode,
    name: "EmailCode",
  },
  {
    path: "/profile-setup",
    component: ProfileSetup,
    name: "ProfileSetup",
  },
  {
    path: "/accept-invitation/:token",
    component: AcceptInvitation,
    name: "AcceptInvitation",
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
  // Add more routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
