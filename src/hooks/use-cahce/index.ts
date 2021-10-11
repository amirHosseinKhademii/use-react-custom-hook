import { useCallback } from "react";
import { cache } from "store";

export const useCache = <T = any>(): IUseCache<T> => {
  return {
    invalidate: useCallback((key: string) => cache[key]?.invalidate(), [cache]),
    getCache: useCallback((key: string) => cache[key]?.data, [cache]),
  };
};
