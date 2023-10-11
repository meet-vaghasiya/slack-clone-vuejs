import { defineStore } from "pinia";
import { computed, ref, ComputedRef, Ref } from "vue";
import localStorageUtility from "../utility/localstorage";

type User = Ref<{
  email: string;
  token: string;
  id: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}>;
type Member = {
  id: number | null;
  user_id: number | null;
  workspace_id: number | null;
  name: string;
  is_admin: boolean | null;
  avatar: string;
};
const defaultMember = localStorageUtility.getItem("member") || {};
const defaultUser = localStorageUtility.getItem("user") || {};
export const useUserStore = defineStore("user", () => {
  const user: User = ref({
    token: localStorageUtility.getItem("token") || "",
    ...defaultUser,
  });

  const member = ref<Member>({
    id: null,
    user_id: null,
    workspace_id: null,
    is_admin: null,
    avatar: "",
    ...defaultMember,
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

  const setUser = (user: User) => {
    user.value = {
      ...user.value,
      ...user,
    };
    localStorageUtility.setItem("user", user.value);
  };

  const setMember = (newMember: Member) => {
    member.value = newMember;
    localStorageUtility.setItem("member", newMember);
  };

  const logout = () => {
    localStorageUtility.clearAll();
  };

  const hasMember = computed(() => !!member.value.id);

  return {
    user,
    email,
    token,
    isAuthenticated,
    setUserEmail,
    setUserToken,
    setMember,
    hasMember,
    logout,
    setUser,
    member,
  };
});
