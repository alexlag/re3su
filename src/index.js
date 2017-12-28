import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import combinedReducer from 'reducer'
import App from './App'

const composeEnhancers = composeWithDevTools({})

const store = createStore(
  combinedReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

const dest = document.getElementById('root')

function render () {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    dest
  )
}

render(App)

if (__DEVELOPMENT__) {
  if (module.hot) {
    module.hot.accept('./App', render)
    module.hot.accept('reducer', () => store.replaceReducer(combinedReducer))
  }
}
