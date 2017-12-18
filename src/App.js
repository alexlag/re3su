import 'semantic-ui-css/semantic.css'
import 'styles/main.scss'

import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

import { increase } from './reducer/count'

import Hello from './components/Hello'
import Counter from './components/Counter'

const App = ({ to, count, increseCounter }) =>
  <Container>
    <Hello to={to} />
    <Counter count={count} onTick={increseCounter} />
  </Container>

App.propTypes = {
  to: T.string.isRequired,
  count: T.number.isRequired,
  increseCounter: T.func.isRequired
}

function mapStateToProps (state) {
  return {
    to: state.to,
    count: state.count
  }
}

const mapDisptchToProps = {
  increseCounter: increase
}

export default connect(mapStateToProps, mapDisptchToProps)(App)
