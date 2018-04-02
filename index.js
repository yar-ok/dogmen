import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/lib/integration/react";

import { persistor, store } from "./app/config/store";

import App from './App';

export default class MyApp extends Component {
    render() {
        return <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </Provider>;
    }
}

AppRegistry.registerComponent('Dogmen', () => MyApp);


// import React, { Component } from 'react';
// import { AppRegistry } from 'react-native';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk'
// import { createStore, applyMiddleware } from 'redux';

// import reducer from './app/reducers/AppReducer';

// import App from './App';

// export default class MyApp extends Component {
//     store = createStore(reducer, applyMiddleware(thunk));

//     render() {
//         return (
//             <Provider store={this.store}>
//                 <App />
//             </Provider>
//         )
//     }
// }

// AppRegistry.registerComponent('Dogmen', () => MyApp);
