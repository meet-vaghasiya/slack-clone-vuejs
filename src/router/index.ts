import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Signin from "@/views/Signin.vue";
import Singup from "@/views/Singup.vue";
import EmailCode from "@/views/EmailCode.vue";
import ProfileSetup from "@/views/ProfileSetup.vue";
import NotFound from "@/views/NotFound.vue";
import AcceptInvitation from "@/views/AcceptInvitation.vue";
import Main from "@/views/Main.vue";
import Test from "../views/Test.vue";
import { useWorkspaceStore } from "@/stores/workspace";
import OneToOneMessage from "../views/OneToOneMessage.vue";
import ChannelMessage from "../views/ChennelMessage.vue";

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
    meta: {
      template: "empty",
    },
  },
  {
    path: "/signup",
    component: Singup,
    name: "Signup",
    meta: {
      template: "empty",
    },
  },
  {
    path: "/email-code",
    component: EmailCode,
    name: "EmailCode",
    meta: {
      template: "empty",
    },
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
    path: "/workspace/:id/users/:receiverId",
    component: OneToOneMessage,
    name: "OneToOneMessage",
  },
  {
    path: "/workspace/:id/channel/:channelId",
    component: ChannelMessage,
    name: "ChannelMessage",
  },
  {
    path: "/workspace/:id",
    component: Main,
  },
  {
    path: "/test",
    component: Test,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
    meta: {
      template: "empty",
    },
  },
  // Add more routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
