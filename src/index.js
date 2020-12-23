import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import App from './layouts/app'

const store = configureStore()

window.React = React

library.add(far, fas)

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('app')
)
