const INC = '@counter/INC'

export function increase () {
  return { type: INC }
}

export default (state = 0, action = {}) => {
  switch (action.type) {
    case INC:
      return state + 1
    default:
      return state
  }
}
