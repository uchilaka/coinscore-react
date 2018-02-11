import React from 'react';
import {
    Menu,
    Image
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
//import './index.css';
import {
    Switch,
    HashRouter as Router,
    Route
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { appStore } from './redux/factory';

import Directory from './Directory';

import * as logoWhite from './res/logo-white.png';

// About code splitting and using Async load for components: https://www.npmjs.com/package/react-async-component
import { asyncComponent } from 'react-async-component';

// Define async components
const About = asyncComponent({ resolve: () => import('./About') });

class App extends React.Component {

    render() {
        return (
            <Provider store={appStore}>
                <Router>
                    <span>
                        <Menu inverted size="huge" secondary attched="top" id="topbar">
                            <Menu.Item header href="/"><Image alt="CoinScore" src={logoWhite} className="logo" /></Menu.Item>
                            {/* 
                            <Menu.Menu position="right">
                                <Menu.Item></Menu.Item>
                            </Menu.Menu>
                            */}
                            <Menu.Item href="#/about">About Us</Menu.Item>
                            <Menu.Item>The Score</Menu.Item>
                            <Menu.Item>Data</Menu.Item>
                        </Menu>
                        <main>
                            <Switch>
                                <Route exact path="/" component={Directory} />
                                <Route path="/about" component={About} />
                            </Switch>
                        </main>
                    </span>
                </Router>
            </Provider>
        )
    }
}

export default App;