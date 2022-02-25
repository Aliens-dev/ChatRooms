import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./routes";
import { Provider } from "react-redux";
import {applyMiddleware, createStore, compose } from "redux";
import reducers from './reducers';
import thunk from "redux-thunk";

import 'bootstrap/scss/bootstrap.scss'
import './assets/app.scss'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const App = () => {
    return (
        <Provider
            store={createStore(reducers, composeEnhancers(applyMiddleware(thunk)))}
        >
            <Routes />
        </Provider>
    )
}



export default App;