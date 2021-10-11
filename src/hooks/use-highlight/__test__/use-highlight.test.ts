import { renderHook } from '@testing-library/react-hooks'
import { useHighlight } from '..'

describe('Use highlight hook', () => {
  it('Should render properly', async () => {
    const { result } = renderHook(() => useHighlight('test', true))
    expect(result.current.highLight).toBeTruthy()
  })
})
