import { renderHook } from '@testing-library/react-hooks'
import { useFetch } from '..'
import { wrapper } from 'tests'
import { getPlaceholder } from 'services/placeholder'

const service = getPlaceholder as any

jest.mock('services/placeholder')

describe('Use fetch hook', () => {
  beforeEach(() => service.mockResolvedValueOnce({ data: 'test' }))
  afterEach(() => jest.resetAllMocks())

  it('Should render properly', async () => {
    const { result, waitFor } = renderHook(
      () => useFetch({ key: 'test', service }),
      { wrapper }
    )
    expect(result.current.loading).toBeTruthy()
    await waitFor(() => !result.current.loading)
    expect(result.current.data.data).toBe('test')
  })
})
