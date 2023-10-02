
<template>
      <div class="min-h-screen m-auto">
            <component :is="currentComponent">
                  <router-view />
            </component>
      </div>
</template>


<script setup lang="ts">
import { useTemplate } from '@/hooks/templates';

const { currentComponent } = useTemplate();
</script>

<style scoped></style>
