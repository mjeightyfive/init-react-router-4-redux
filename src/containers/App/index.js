import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Nav from '../../components/Nav';

import './styles.scss';

class App extends Component {
    render() {
        const { children } = this.props;
        return (
            <div className="app">
                <Nav />
                <div className="content indigo accent-1">
                    {children}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;
