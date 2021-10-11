interface IUseFetch<T> {
  service: () => Promise<T>
  params?: any
  key: string
  enabled?: boolean
}

interface IUseServiceState<T> {
  data: T
  error: any
  loading: boolean
  fetching: boolean
}

interface IUseFetchOutput<T> {
  data: T
  error: any
  loading: boolean
  fetching: boolean
}
