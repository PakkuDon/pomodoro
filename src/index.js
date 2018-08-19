import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import Pomodoro from './containers/Pomodoro'
import reducer from './reducers'

import './styles.css'

const store = createStore(reducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <Pomodoro />
  </Provider>,
  document.querySelector('#root'),
)
