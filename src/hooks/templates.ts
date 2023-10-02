// templates.js
import { computed } from "vue";
import { useRoute } from "vue-router";
import defaultTemplate from "@/components/template/default.vue";
import emptyTemplate from "@/components/template/empty.vue";

export function useTemplate() {
  const route = useRoute();
  const allTemplates = {
    default: defaultTemplate,
    empty: emptyTemplate,
  };

  const currentTemplate = computed(() => route.meta.template || "default");
  const currentComponent = computed(() => allTemplates[currentTemplate.value]);

  return {
    currentTemplate,
    currentComponent,
  };
}
