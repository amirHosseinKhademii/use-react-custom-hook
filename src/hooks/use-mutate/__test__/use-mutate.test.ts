import { renderHook, act } from '@testing-library/react-hooks'
import { savePlaceholder } from 'services/placeholder'
import { useMutate } from '..'

const service = savePlaceholder as any

jest.mock('services/placeholder')

describe('Use mutate hook', () => {
  beforeEach(() => service.mockResolvedValueOnce('success post'))
  afterEach(() => jest.resetAllMocks())

  it('Should render properly', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useMutate({ service })
    )
    expect(result.current.loading).toBeFalsy()
    act(() => result.current.mutate({ name: 'foo' }))
    jest.spyOn(console, 'error').mockImplementation(jest.fn())
    expect(result.current.loading).toBeTruthy()
    expect(service).toHaveBeenCalledTimes(1)
    expect(service).toHaveBeenCalledWith({ name: 'foo' })
    jest.resetAllMocks()
    await waitForNextUpdate()
    expect(result.current.loading).toBeFalsy()
    expect(result.current.data).toBe('success post')
  })
})
