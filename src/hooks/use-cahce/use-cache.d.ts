interface IUseCache<T> {
  invalidate: (key: string) => void;
  getCache: (key: string) => T;
}
