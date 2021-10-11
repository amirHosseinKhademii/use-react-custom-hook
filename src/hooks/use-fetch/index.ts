import { useCallback, useEffect } from "react";
import { useSnapshot } from "valtio";
import { cache } from "store";

export const useFetch = <T = any>({
  params,
  key,
  service,
  enabled = true,
}: IUseFetch<T>): IUseFetchOutput<T> => {
  const state = useSnapshot(cache);

  const fetcher = useCallback(async ({ params, key, service, cached }) => {
    if (cached) {
      cache[key] = { ...cache[key], fetching: true };
    } else {
      cache[key] = {
        ...cache[key],
        loading: true,
        invalidate: () => fetcher({ params, key, service, cached: true }),
      };
    }
    try {
      const data = await service(params);
      cache[key] = {
        ...cache[key],
        data,
        loading: false,
        fetching: false,
        error: undefined,
      };
    } catch (error) {
      cache[key] = {
        ...cache[key],
        error,
        loading: false,
        fetching: false,
      };
    }
  }, []);

  useEffect(() => {
    if (enabled) fetcher({ params, key, service, cached: false });
  }, [enabled]);

  return {
    data: state[key]?.data,
    error: state[key]?.error,
    loading: state[key]?.loading,
    fetching: state[key]?.fetching,
  };
};
