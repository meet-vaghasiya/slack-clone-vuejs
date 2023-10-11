import { ref } from "vue";

export function useApi(fn: Function, payload) {
  const data = ref<T | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const fetchData = async () => {
    try {
      const res = await fn(payload);
      console.log(res);
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };
  fetchData();
  return {
    data,
    loading,
    error,
  };
}
