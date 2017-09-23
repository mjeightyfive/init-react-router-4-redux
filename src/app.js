import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import shortid from 'shortid';

import './app.scss';

import App from './containers/App';
import store from './store.js';
import routes from './routes.js';
// Create a history of your choosing (we're using a browser history in this case)
const history = createBrowserHistory();

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

const RouteWithSubRoutes = (route) => {
    return (
        <Route
            path={route.path}
            render={(props) => {
                return <route.component {...props} routes={route.routes} />;
            }}
        />
    );
};

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App>
                <Switch>
                    {routes.map((route) => {
                        return (
                            <RouteWithSubRoutes
                                key={shortid.generate()}
                                {...route}
                            />
                        );
                    })}
                </Switch>
            </App>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);
