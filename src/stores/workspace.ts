import { defineStore } from "pinia";
import { computed, ref, ComputedRef, Ref } from "vue";
import localStorageUtility from "../utility/localstorage";

type Workspace = {
  id: number | null;
  name: string;
  user_id: number | null;
  create_at: string;
  updated_at: string;
};

const defaultWorkspace = localStorageUtility.getItem("workspace") || {};

export const useWorkspaceStore = defineStore("workspace", () => {
  const workspace: Ref<Workspace> = ref({
    id: null,
    name: "",
    user_id: null,
    create_at: "",
    updated_at: "",
    ...defaultWorkspace,
  });

  const setWorkspace = (newWorkspace: Workspace) => {
    workspace.value = newWorkspace;
    localStorageUtility.setItem("workspace", newWorkspace);
  };

  const id: string = computed(() => workspace.value.id);
  return { id, workspace, setWorkspace };
});
