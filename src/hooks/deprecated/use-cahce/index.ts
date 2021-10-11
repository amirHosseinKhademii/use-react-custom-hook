import { CacheContext } from 'providers/cache-provider'
import { useCallback, useContext } from 'react'

export const useCache = (): IUseCache => {
  const { cache } = useContext(CacheContext)

  return {
    invalidate: useCallback((key: string) => cache[key]?.invalidate(), [cache]),
    getCache: useCallback((key: string) => cache[key]?.data, [cache]),
  }
}
