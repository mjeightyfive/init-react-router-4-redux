// import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import shortid from 'shortid';

import App from './containers/App';
import { store, history } from './store.js';
import routes from './routes.js';

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

const RouteWithSubRoutes = (route) => {
    return (
        <Route
            path={route.path}
            render={(props) => {
                return <route.component {...props} routes={routes} />;
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
