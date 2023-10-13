
<template>
      <div class="min-h-screen m-auto">
            <h1 v-if="isLoading">Loading
            </h1>
            <template v-else>
                  <component :is="currentComponent">
                        <router-view :key="routeFullPath" />
                  </component>
            </template>
      </div>
</template>


<script setup lang="ts">
import { useTemplate } from '@/hooks/templates';
import { getAuthUser } from './api/auth';
import { onBeforeMount, ref, computed } from 'vue'
import { useUserStore } from './stores/user';
import { useRoute } from 'vue-router';
const { currentComponent } = useTemplate();

const isLoading = ref(false)
const userStore = useUserStore()
const route = useRoute();
const routeFullPath = computed(() => {
      return route.fullPath;
});
onBeforeMount(async () => {
      try {
            isLoading.value = true
            const res = await getAuthUser()
            userStore.setUser(res.data.user)
      } catch (error) {
            if (error.response && error.response.status === 401) {
                  userStore.logout()
            }
            console.error(error.response, 'ppp')
      } finally {
            isLoading.value = false
      }
})

</script>

<style scoped></style>
