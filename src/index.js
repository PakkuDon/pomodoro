import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Pomodoro from './containers/Pomodoro'
import reducer from './reducers'

import './styles.css'

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <Pomodoro />
  </Provider>,
  document.querySelector('#root'),
)
