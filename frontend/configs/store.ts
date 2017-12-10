import { applyMiddleware, compose, createStore } from 'redux';
import { reducers } from '../reducers';
import thunk from "redux-thunk";
import logger from "redux-logger";

const configureStore = () => {
    let middleware = applyMiddleware(thunk, logger);

    const store = createStore(reducers, middleware);

    return store;
}

export { configureStore };
