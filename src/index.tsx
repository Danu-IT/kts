import * as React from 'react'
import { render } from 'react-dom'
import 'regenerator-runtime'
import 'styles/index.scss'
import App from './App'

render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
