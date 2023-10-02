import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Signin from "@/views/Signin.vue";
import Singup from "@/views/Singup.vue";
import EmailCode from "@/views/EmailCode.vue";
import ProfileSetup from "@/views/ProfileSetup.vue";
import NotFound from "@/views/NotFound.vue";
import AcceptInvitation from "@/views/AcceptInvitation.vue";
import Main from "@/views/Main.vue";
import { useWorkspaceStore } from "@/stores/workspace";

const routes = [
  {
    path: "/",
    component: Home,
    beforeEnter: (to, from, next) => {
      const workspaceStore = useWorkspaceStore();

      if (workspaceStore.id) {
        next(`workspace/${workspaceStore.id}`);
      } else {
        next({ name: "Signin" });
      }

      next();
    },
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
    path: "/workspace/:id",
    component: Main,
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
