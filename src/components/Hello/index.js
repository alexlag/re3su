import React from 'react'
import T from 'prop-types'
import { pure } from 'recompose'
import styled from 'styled-components'

const Wrapper = styled.h2``

const Hello = ({ to }) =>
  <Wrapper>
    Hello {to}!
  </Wrapper>

Hello.propTypes = {
  to: T.string.isRequired
}

export default pure(Hello)
