interface IUseGet<T> {
  service: () => Promise<T>
}

interface IUseGetState<T> {
  data: T
  cache: T
  error: any
  loading: boolean
  fetching: boolean
}

interface IUseGetOutput<T> {
  data: T
  cache: T
  error: any
  loading: boolean
  fetching: boolean
  refetch?: () => void
}
