/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import 'css/index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from 'store/store'

import Root from './components/Root'

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Root></Root>
    </Provider>
  </div>,
  document.getElementById('root')
)
