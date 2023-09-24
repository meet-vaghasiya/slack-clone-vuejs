import { defineStore } from "pinia";
import { computed, ref, ComputedRef, Ref } from "vue";

type User = Ref<{
  email: string;
  token: string;
}>;

export const useUserStore = defineStore("user", () => {
  const user: User = ref({
    email: localStorage.getItem("email") || "",
    token: localStorage.getItem("otp") || "",
  });

  const email: ComputedRef<string> = computed(() => user.value.email);

  const isAuthenticated: ComputedRef<boolean> = computed(
    () => !!user.value.token
  );

  const setUserEmail = (email: string) => {
    user.value.email = email;
    localStorage.setItem("email", email);
  };

  const setUserToken = (token: string) => {
    user.value.token = token;
    localStorage.setItem("token", token);
  };

  return { user, email, isAuthenticated, setUserEmail, setUserToken };
});
