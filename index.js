import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';

import reducer from './app/reducers/LoginReducer';

import App from './App';

export default class MyApp extends Component {
    store = createStore(reducer, applyMiddleware(thunk));

    render() {
        return (
            <Provider store={this.store}>
                <App />
            </Provider>
        )
    }
}

AppRegistry.registerComponent('Dogmen', () => MyApp);
