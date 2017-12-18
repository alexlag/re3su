import React from 'react'
import { shallow } from 'enzyme'

import Hello from '.'

describe('components/Hello', () => {
  it('renders correctly', () => {
    const to = 'TEST'
    const wrapper = shallow(<Hello to={to} />)

    expect(wrapper.render().text()).toEqual(`Hello ${to}!`)
  })
})
