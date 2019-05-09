import { routerReducer, routerMiddleware, connectRouter } from 'connected-react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';

// import reducers from './reducers'; // Or wherever you keep your reducers
const history = createBrowserHistory();
const middleware = [routerMiddleware(history)];

const store = createStore(
    combineReducers({
        // ...reducers,
        router: connectRouter(history)
    }),
    applyMiddleware(...middleware)
);

export {
    store,
    history
};
