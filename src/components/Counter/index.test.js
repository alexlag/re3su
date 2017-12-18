import React from 'react'
import { shallow } from 'enzyme'

import Counter from '.'

describe('components/Counter', () => {
  it('renders correctly', () => {
    const count = 1337
    const wrapper = shallow(<Counter count={count} />)

    expect(wrapper.render().text()).toEqual(`Counter: ${count}`)
  })
})
