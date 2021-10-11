import { useCallback, useEffect, useRef, useState } from "react";

const initialState: IUseGetState<any> = {
  data: undefined,
  cache: undefined,
  error: undefined,
  loading: false,
  fetching: false,
};

export const useGet = <T = any>({ service }: IUseGet<T>): IUseGetOutput<T> => {
  const unMountingRef = useRef(false);
  const [state, setState] = useState<IUseGetState<T>>(initialState);

  const fetcher = useCallback(async (cached?: boolean) => {
    if (!unMountingRef.current) {
      if (cached)
        setState((prev) => ({
          ...prev,
          fetching: true,
        }));
      else
        setState((prev) => ({
          ...prev,
          loading: true,
        }));
      try {
        const data = await service();
        if (!unMountingRef.current)
          setState((prev) => ({
            ...prev,
            data,
            cache: prev.data,
            loading: false,
            fetching: false,
            error: undefined,
          }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error,
          loading: false,
          fetching: false,
        }));
      }
    }
  }, []);

  useEffect(() => {
    fetcher();
    return () => {
      unMountingRef.current = true;
      setState(initialState);
    };
  }, []);

  return {
    ...state,
    refetch: () => fetcher(true),
  };
};
