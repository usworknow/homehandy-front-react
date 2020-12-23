
import { applyMiddleware, compose, createStore } from 'redux'
// import reduxWebsocket from '@giantmachines/redux-websocket'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import { tokenMiddleware } from './reduxMiddleware'

const buildStore = () => {
    // const reduxWebsocketMiddleware = reduxWebsocket({reconnectOnClose: true})
    // const middlewares = [reduxWebsocketMiddleware, thunkMiddleware, socketMiddleware, tokenMiddleware, chatMiddleware]
    const middlewares = [thunkMiddleware, tokenMiddleware]
    let composeEnhancer = compose
    if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_DEBUG_MODE === 'true')  {
        middlewares.push(createLogger())
        composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    }

    return createStore(rootReducer, composeEnhancer(applyMiddleware(...middlewares)))
}

export default function () {
    if (window.store === undefined) {
        window.store = buildStore()
        return window.store
    }
    if (process.env.NODE_ENV === 'development') {
        window.store.replaceReducer(rootReducer)
    }
    return window.store
}
