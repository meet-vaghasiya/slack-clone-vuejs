import { ref } from "vue";

export function useApi(fn: Function, params, callback) {
  const result = ref<T | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const statusCode = ref<number>();
  const fetchData = async () => {
    try {
      loading.value = true;
      const { data, status } = await fn(...params);
      result.value = data.data;
      statusCode.value = status;
      if (callback) {
        callback(null, data.data);
      }
    } catch (e) {
      error.value = e;
      callback(e, null);
    } finally {
      loading.value = false;
    }
  };
  fetchData();
  return {
    result,
    loading,
    error,
    statusCode,
    refetch: fetchData,
  };
}

export function useMultipleApi(apiDataArray, callback) {
  const loading = ref(true);
  const result = ref([]);
  const error = ref(null);

  const fetchData = async () => {
    loading.value = true;
    const requests = apiDataArray.map((apiData) => {
      const { endpoint, params, fn } = apiData;
      return fn(...params);
    });

    try {
      const responses = await Promise.all(requests);
      result.value = responses.map((response) => response.data.data);

      if (callback) {
        callback(
          null,
          responses.map((response) => response.data.data)
        );
      }
    } catch (err) {
      if (callback) {
        callback(err, null);
      }
    } finally {
      loading.value = false;
    }
  };
  fetchData();
  return {
    result,
    loading,
    error,
    fetchData,
  };
}
