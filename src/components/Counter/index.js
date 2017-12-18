import React from 'react'
import T from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div``

class Counter extends React.PureComponent {
  componentDidMount () {
    if (this.props.onTick) {
      this.interval = setInterval(this.props.onTick, 1000)
    }
  }

  componentWillUnmount () {
    this.interval && clearInterval(this.interval)
  }

  render () {
    const { count } = this.props

    return (
      <Wrapper>
        Counter: {count}
      </Wrapper>
    )
  }
}

Counter.propTypes = {
  count: T.number.isRequired,
  onTick: T.func
}

export default Counter
