import { defineStore } from "pinia";
import { computed, ref, ComputedRef, Ref } from "vue";
import localStorageUtility from "../utility/localstorage";

type User = Ref<{
  email: string;
  token: string;
}>;

export const useUserStore = defineStore("user", () => {
  const user: User = ref({
    email: localStorageUtility.getItem("email") || "",
    token: localStorageUtility.getItem("token") || "",
  });
  const email: ComputedRef<string> = computed(() => user.value.email);
  const token: ComputedRef<string> = computed(() => user.value.token);
  const isAuthenticated: ComputedRef<boolean> = computed(
    () => !!user.value.token
  );

  const setUserEmail = (email: string) => {
    user.value.email = email;
    localStorageUtility.setItem("email", email);
  };

  const setUserToken = (token: string) => {
    user.value.token = token;
    localStorageUtility.setItem("token", token);
  };

  return { user, email, token, isAuthenticated, setUserEmail, setUserToken };
});
