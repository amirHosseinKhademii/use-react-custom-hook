import { renderHook, act } from '@testing-library/react-hooks'
import { useFetch } from '..'
import { getUser } from 'services/placeholder'

const service = getUser as any

jest.mock('services/placeholder')

describe('Use fetch hook', () => {
  beforeEach(() => service.mockResolvedValueOnce({ data: 'test' }))
  afterEach(() => jest.resetAllMocks())

  it('Should render properly', async () => {
    const { result, waitFor } = renderHook(() => useFetch({ service }))
    expect(result.current.loading).toBeTruthy()
    await waitFor(() => !result.current.loading)
    expect(service).toHaveBeenCalledTimes(1)
    expect(service).toHaveBeenCalledWith()
    expect(result.current.data.data).toBe('test')
  })

  it('Should refetch properly', async () => {
    const { result, waitFor } = renderHook(() => useFetch({ service }))
    expect(result.current.loading).toBeTruthy()
    await waitFor(() => !result.current.loading)
    expect(result.current.loading).toBeFalsy()
    act(() => result.current.refetch())
    jest.spyOn(console, 'error').mockImplementation(jest.fn())
    expect(service).toHaveBeenCalledTimes(2)
    expect(service).toHaveBeenCalledWith()
    jest.resetAllMocks()
    expect(result.current.fetching).toBeTruthy()
    await waitFor(() => !result.current.fetching)
    expect(result.current.fetching).toBeFalsy()
  })
})
