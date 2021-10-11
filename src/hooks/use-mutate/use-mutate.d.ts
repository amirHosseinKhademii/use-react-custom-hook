interface IUseMutateState<T> {
  data: T
  error: any
  loading: boolean
}

interface IUseMutate<T> {
  service: (any) => Promise<T>
  onSuccess?: (T) => T
}

interface IUseMutateOutput<T> {
  data: T
  error: any
  loading: boolean
  mutate: (any) => void
  reset: () => void
}
