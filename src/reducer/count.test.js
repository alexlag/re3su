import reducer, { increase } from './count'

describe('reducer/count', () => {
  let state

  it('initializes correctly', () => {
    state = reducer()
    expect(state).toEqual(0)
  })

  it('reacts to action', () => {
    state = reducer(state, increase())
    expect(state).toEqual(1)
  })

  it('does not react to irrelevant action', () => {
    state = reducer(state, {})
    expect(state).toEqual(1)
  })
})
