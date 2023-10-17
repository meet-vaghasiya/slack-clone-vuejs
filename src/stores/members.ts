import { defineStore } from "pinia";
import { computed, ref, ComputedRef, Ref } from "vue";

type Member = {
  id: number | null;
  name: string;
  avatar: string | null;
};

export const useMembersStore = defineStore("members", () => {
  const members: Ref<Member[]> = ref([]);

  const setMembers = (newMembers: Member[]) => {
    members.value = newMembers;
  };

  const addMember = (newMember: Member) => {
    members.value.push(newMember);
  };

  return { members, addMember, setMembers };
});
