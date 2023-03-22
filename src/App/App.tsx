import './App.scss'
import React from 'react'
import '../assets/fonts/fonts.scss'

import Header from 'components/Header'
import Router from 'components/Router'
import { HashRouter } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Router />
      </HashRouter>
    </div>
  )
}

export default App
