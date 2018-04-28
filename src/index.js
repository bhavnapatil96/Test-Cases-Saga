import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {applyMiddleware,createStore} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import {routerMiddleware,ConnectedRouter} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import allReducer from './reducers/rootReducer'
import mysaga from './saga/saga.js'
const sagaMiddleware=createSagaMiddleware()
const history=createHistory()
const store=createStore(allReducer,composeWithDevTools(),applyMiddleware(thunk,routerMiddleware(history),sagaMiddleware))
sagaMiddleware.run(mysaga)
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>, document.getElementById('root'));
