import { useCallback, useEffect, useState } from "react";

const initialState: IUseMutateState<any> = {
  data: undefined,
  error: undefined,
  loading: false,
};

export const useMutate = <T = any>({
  service,
  onSuccess,
}: IUseMutate<T>): IUseMutateOutput<T> => {
  const [state, setState] = useState<IUseMutateState<T>>(initialState);

  const mutate = useCallback(async (payload) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const data = await service(payload);
      setState((prev) => ({
        ...prev,
        data,
        loading: false,
        error: undefined,
      }));
      onSuccess && onSuccess(data);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error.response?.data || "Something went wrong",
        loading: false,
      }));
    }
  }, []);

  const reset = useCallback(() => setState(initialState), []);

  useEffect(() => {
    return () => reset();
  }, []);

  return {
    ...state,
    mutate,
    reset,
  };
};
