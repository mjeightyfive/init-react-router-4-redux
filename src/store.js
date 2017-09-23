import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

// import reducers from './reducers'; // Or wherever you keep your reducers

const middleware = routerMiddleware(history);

const store = createStore(
    combineReducers({
        // ...reducers,
        router: routerReducer
    }),
    applyMiddleware(middleware)
);

export default store;
