import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

class Nav extends PureComponent {
    render() {
        return (
            <nav className="nav indigo darken-4">
                <div className="nav-wrapper">
                    <Link className="nav__home" to="/">&#8962;</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <Link to="/step1">Step 1</Link>
                        </li>
                        <li>
                            <Link to="/step2">Step 2</Link>
                        </li>
                        <li>
                            <Link to="/step3">Step 3</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;
