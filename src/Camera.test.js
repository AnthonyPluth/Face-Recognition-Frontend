import React from 'react'
import ReactDOM from 'react-dom'
import { Camera } from './Camera'

describe('Welcome component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Camera />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
