import { useCallback, useContext, useEffect, useRef } from 'react'
import { CacheContext } from 'providers/cache-provider'

export const useFetch = <T = any>({
  params,
  key,
  service,
  enabled = true,
}: IUseFetch<T>): IUseFetchOutput<T> => {
  const unMountingRef = useRef(false)

  const { cache, setCache } = useContext(CacheContext)

  const fetcher = useCallback(async ({ params, key, service, cached }) => {
    if (!unMountingRef.current) {
      if (cached)
        setCache((prev) => ({
          ...prev,
          [key]: {
            ...prev[key],
            fetching: true,
          },
        }))
      else
        setCache((prev) => ({
          ...prev,
          [key]: {
            ...prev[key],
            loading: true,
            invalidate: () => fetcher({ params, key, service, cached: true }),
          },
        }))
      try {
        const data = await service(params)
        if (!unMountingRef.current)
          setCache((prev) => ({
            ...prev,
            [key]: {
              ...prev[key],
              data,
              loading: false,
              fetching: false,
              error: undefined,
            },
          }))
      } catch (error) {
        if (!unMountingRef.current)
          setCache((prev) => ({
            ...prev,
            [key]: { ...prev[key], error, loading: false, fetching: false },
          }))
      }
    }
  }, [])

  useEffect(() => {
    if (enabled) fetcher({ params, key, service, cached: false })
    return () => {
      unMountingRef.current = true
    }
  }, [enabled])

  return {
    data: cache[key]?.data,
    error: cache[key]?.error,
    loading: cache[key]?.loading,
    fetching: cache[key]?.fetching,
  }
}
