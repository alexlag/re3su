import config from 'Config'

export default (state = config.defaultTo, action = {}) => {
  switch (action.type) {
    default:
      return state
  }
}
